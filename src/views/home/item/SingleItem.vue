<template>
  <div class="single-item shadow d-flex">
    <div class="single-item__image">
      <img :src="offerFeatureImage" class="shadow" alt="" />
      <span class="single-item-image-floading-text">{{
        offer.offer_category_name
      }}</span>
    </div>
    <div class="single-item__info">
      <div class="single-item__info-title" v-if="offer.has_access">
        <p class="single-item__info-title-bold m-0">{{ offer.name }}</p>
        <p class="single-item__info-title-muted m-0">
          By {{ offer.agency_name }}
        </p>
      </div>
      <div
        class="single-item__info-descriptions"
        :class="
          offer.has_access
            ? 'flex-row justify-content-start d-flex align-items-center'
            : 'flex-column justify-content-start d-flex align-items-start'
        "
      >
        <div class="single-item__info-description-item">
          <font-awesome-icon :icon="['fas', 'location-pin']" />
          <p class="single-item__info-description-item-text">
            {{ offer.address }}
          </p>
        </div>
        <div
          class="single-item__info-description-item mt-3"
          v-if="!offer.has_access"
        >
          <font-awesome-icon :icon="['fas', 'phone']" />
          <p class="single-item__info-description-item-text">
            {{ offer.agent_phone || "" }}
          </p>
        </div>

        <div
          v-if="offer.has_access"
          class="d-flex flex-column-sm justify-content-start align-items-center"
        >
          <div class="single-item__info-description-item">
            <font-awesome-icon :icon="['fas', 'calendar']" />
            <p class="single-item__info-description-item-text">
              {{ convertDateToPolish }}
            </p>
          </div>

          <div
            class="single-item__info-description-item"
            v-if="offer.has_access"
          >
            <font-awesome-icon :icon="['fas', 'clock']" />
            <p
              class="single-item__info-description-item-text d-inline-block"
              id="disabled-wrapper"
              v-b-tooltip.hover
              title="czas pozostały do końca aukcji"
            >
              <CountDown :endDate="new Date(offer.date_end)">
                <template v-slot="{ day, hour, min, sec }">
                  {{ day }}D, {{ hour }}G : {{ min }}M : {{ sec }}S
                </template>
              </CountDown>
            </p>
          </div>
        </div>
      </div>
      <div
        class="single-item__info-actions d-flex align-items-end flex-column-sm"
        :class="
          offer.has_access ? ' justify-content-between' : ' justify-content-end'
        "
      >
        <div class="action-discription" v-if="offer.has_access">
          <div class="mr-3">
            <img width="35" src="/assets/icon/Chart.png" alt="" />
          </div>
          <p class="m-0">
            Aktualna cena
            <span class="text-blue"> {{ currentPrice }} zł</span>
          </p>
        </div>
        <div class="action-btn">
          <router-link
            v-if="offer.has_access"
            :to="{
              name: 'auction-details',
              params: {
                id: offer.id,
              },
              query: {
                t: new Date().getTime(),
              },
            }"
            class="btn btn-primary shadow auction-btn"
          >
            <strong>
              {{
                !offer.is_finished ? "Licytuj" : "Szczegóły zakończonej aukcji"
              }}
            </strong>
          </router-link>

          <div
            v-if="!offer.has_access"
            class="btn btn-primary shadow auction-btn"
            @click="requestForAccess(offer)"
          >
            <span v-if="isAccessButtonLoading"
              ><easy-spinner class="small-spinner" />
              <strong> Przetwarzanie</strong></span
            >
            <strong v-else> Poproś o dostęp</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/es";

import CountDown from "./CountDown.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
export default {
  components: {
    CountDown,
  },
  props: {
    offer: {
      type: Object,
      required: true,
    },
  },
  created: function () {
    this.moment = moment;
  },

  setup() {
    const isAccessButtonLoading = ref(false);
    const store = useStore();
    const toast = useToast();

    function requestForAccess(offer) {
      isAccessButtonLoading.value = true;
      const payload = {
        offer_id: offer.id,
      };
      store
        .dispatch("Offer/requestForAccess", payload)
        .then((result) => {
          if (result.data.status === "success") {
            toast.success("Wysłano prośbę o dostęp do oferty");
          } else {
            toast.error(result.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          isAccessButtonLoading.value = false;
        });
    }

    return {
      requestForAccess,
      isAccessButtonLoading,
    };
  },

  computed: {
    currentPrice: function () {
      // add , and space  to price
      let price = 0;
      if (this.offer.current_price !== null && this.offer.current_price !== 0) {
        price = this.offer.current_price;
      } else {
        price = this.offer.price_start;
      }
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    offerFeatureImage: function () {
      if (this.offer.images.length > 0 && this.offer.images[0].path)
        return this.offer.images[0].path;
      else return "/assets/img/no_image.png";
    },
    convertDateToPolish: function (date) {
      let dateTime = moment(this.offer.date_start).lang("pl").format("MMM DD");
      const polishMonthNames = [
        "Sty",
        "Lut",
        "Mar",
        "Kwi",
        "Maj",
        "Cze",
        "Lip",
        "Sie",
        "Wrz",
        "Paź",
        "Lis",
        "Gru",
      ];
      const EnglishMonthNames = [
        "Jan",
        "Fab",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      dateTime = dateTime.replace(
        EnglishMonthNames[moment(this.offer.date_start).month()],
        polishMonthNames[moment(this.offer.date_start).month()]
      );
      return dateTime;
      // replace english month name to polis
    },
  },
};
</script>

<style>
.single-item__image img {
  height: 200px;
  object-fit: cover;
  max-width: 100%;
  object-fit: cover;
  border-radius: 25px;
  position: relative;
  width: 270px;
}
.single-item {
  border-radius: 25px;
  padding: 15px;
}

.single-item {
  background: #fff !important;
  box-sizing: border-box;
  border-radius: 25px;
  margin-bottom: 40px;
  border: 2px solid #dfdcdc;
  transition-duration: 0.2s;
}

.single-item:hover {
  border: 2px solid #fff;
}
span.single-item-image-floading-text {
  position: absolute;
  left: 10px;
  top: 10px;
  background: #fff;
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 12px;
  color: var(--blue);
  font-weight: bold;
  border: 1px solid #f5f5f5;
}

.single-item__image {
  position: relative;
  margin-right: 20px;
  min-height: 200px !important;
  min-width: 270px !important;
}
.single-item__info-title-bold {
  font-size: 1.55rem;
  font-weight: bold;
}

.single-item__info-title-muted {
  font-size: 1rem;
  color: var(--grey);
}

.single-item__info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.single-item__info-descriptions {
  margin-top: 0.75rem;
  width: 100%;
}
.single-item__info-description-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey);
  margin-right: 30px;
  font-size: 1rem;
}
.single-item__info-description-item svg {
  margin-right: 10px;
}
.single-item__info-description-item p {
  margin: 0;
}
.action-discription {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 25px;
}
.mr-3 {
  margin-right: 10px;
}
.auction-btn {
  min-width: 250px;
  height: 45px;
  border-radius: 10px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

@media (max-width: 768px) {
  .single-item {
    flex-direction: column;
  }
  .single-item__image {
    margin-right: 0px !important;
    margin-bottom: 10px !important;
  }
  .single-item__image img {
    width: 100%;
    height: 270px;
  }
  .flex-column-sm {
    flex-direction: column !important;
    align-items: start !important;
  }
  .flex-column-sm.align-items-center {
    flex-direction: column !important;
    align-items: start !important;
  }
  .single-item__info-description-item p {
    margin: 0;
    font-size: 13px;
  }
  .single-item__info-description-item {
    justify-content: start !important;
    margin-bottom: 10px;
  }

  .single-item__info-actions.align-items-end {
    justify-content: start !important;
    align-items: start !important;
  }
  .action-discription {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .action-btn,
  .auction-btn {
    width: 100%;
  }

  .action-btn {
    margin-top: 1rem;
  }
}
</style>