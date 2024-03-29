<template>
  <div class="auction-details-page">
    <div class="spinner" v-if="isLoading">
      <easy-spinner class="large-spinner" />
    </div>
    <div v-else class="row">
      <div class="col-md-6">
        <div class="carosel-area">
          <div class="image-and-timer-area">
            <carousel
              v-if="offer.images && offer.images.length > 0"
              class="main-image-carosel"
              :class="{ 'multiple-slide': offer.images.length > 1 }"
              :mouseDrag="true"
              :touchDrag="true"
              :itemsToShow="1"
              v-model="activeOfferImageIndex"
              :snapAlign="'center'"
              :perPage="1"
              :wrapAround="true"
              perPageCustom="[[768, 1], [1024, 1]]"
            >
              <slide v-for="(image, index) in offer.images" :key="index">
                <img :src="image.path" class="main-image" alt="KAPPI" />
              </slide>
            </carousel>

            <div class="auction-timer bg-blue">
              <p>
                {{
                  isAuctionRunning
                    ? "Aukcja kończy się za"
                    : isAuctionFinished
                    ? "Aukcja zakończona"
                    : "Aukcja zaczyna się za"
                }}
              </p>

              <CountDown :offer="offer">
                <template v-slot="{ day, hour, min, sec }">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ day }}
                      </span>
                      <span class="text">Dni</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ hour }}
                      </span>
                      <span class="text">Godzin</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time"> {{ min }}</span>
                      <span class="text" v-if="min == 1">Minuta</span>
                      <span class="text" v-else-if="min > 1 && min < 5"
                        >Minuty</span
                      >
                      <span class="text" v-else>Minut</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ sec }}
                      </span>
                      <span class="text">Sekund</span>
                    </div>
                  </div>
                </template>
              </CountDown>
            </div>
          </div>

          <div
            class="swiper-area swiper-area-border"
            v-if="offer.images && offer.images.length > 1"
          >
            <carousel
              :mouseDrag="false"
              :touchDrag="false"
              v-model="activeOfferImageIndex"
              ref="slider"
              :snapAlign="'center'"
              :itemsToShow="4"
              :wrapAround="true"
            >
              <slide
                class="hide-on-mobile"
                v-for="(image, index) in offer.images"
                :key="index"
                @click="changeSliderImage(index)"
              >
                <img :src="image.path" class="slide-image" alt="KAPPI" />
              </slide>

              <template #addons>
                <div class="hide-on-mobile">
                  <navigation />
                </div>
                <pagination />
              </template>
            </carousel>
          </div>
        </div>
      </div>
      <div class="col-md-6 right-half">
        <div v-if="isAuctionRunning" class="aution-running-sta">
          Aukcja trwa
        </div>
        <div v-if="isAuctionFinished" class="aution-finish-sta">
          Aukcja zakończona
        </div>
        <div class="item-details-area">
          <div>
            <h3 class="item-heading">{{ offer.name }}</h3>
          </div>
          <div class="item-description">
            <p>
              {{ offer.description }}
            </p>
          </div>

          <div class="items-list-description">
            <table class="item-details-table table table-borderless">
              <tr>
                <td class="text-right">Agencja:</td>
                <td class="text-left text-muted">
                  <div>{{ offer.agency_name }}</div>
                </td>
              </tr>
              <tr>
                <td class="text-right">Kategoria:</td>
                <td class="text-left text-muted">
                  <div>
                    {{ offer.offer_category_name }}
                  </div>
                </td>
              </tr>
              <tr>
                <td class="text-right">Adres:</td>
                <td class="text-left text-muted">
                  <div>{{ offer.address }}</div>
                </td>
              </tr>
            </table>
          </div>
          <div
            class="item-pricing-area mt-3"
            v-if="!isAuctionRunning && !isAuctionFinished"
          >
            <table class="item-details-table table table-borderless">
              <tr>
                <td class="text-right">Cena wywoławcza:</td>
                <td class="text-left">
                  <h5 class="text-blue m-0">
                    <strong>{{ offerStartPrice }} zł</strong>
                  </h5>
                </td>
              </tr>
            </table>
          </div>

          <AuctionBidding
            :currentPrice="currentPrice"
            :offerMinPrice="offerMinPrice"
            :offer="offer"
            v-if="isAuctionRunning"
          ></AuctionBidding>
          <AuctionFinish
            :offer="offer"
            v-if="isAuctionFinished"
          ></AuctionFinish>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CountDown from "./item/CountDown.vue";
import moment from "moment";
import AuctionBidding from "../../components/offer/AuctionBidding.vue";
import AuctionFinish from "../../components/offer/AuctionFinish.vue";
import { useToast } from "vue-toastification";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    CountDown,
    AuctionBidding,
    AuctionFinish,
  },
  created: function () {
    this.moment = moment;
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const offerID = route.params.id;
    const store = useStore();
    const offer = computed(() => store.getters["Offer/currentOffer"]);
    const toast = useToast();

    const slider = ref(null);

    const activeOfferImageIndex = ref(0);

    function changeSliderImage(index) {
      activeOfferImageIndex.value = index;
    }

    const isLoading = ref(false);

    onMounted(() => {
      isLoading.value = true;
      store
        .dispatch("Offer/getOfferDetails", offerID)
        .then((res) => {
          const { status, message } = res.data;
          if (status === "error") {
            toast.error(message);
            router.push("/home");
          }
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    const currentPrice = computed(() => {
      let price = 0;
      if (
        offer.value.current_price !== null &&
        offer.value.current_price !== 0
      ) {
        price = offer.value.current_price;
      } else {
        price = offer.value.price_start;
      }
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });

    const offerMinPrice = computed(() => {
      let price = 0;

      if (offer.value.total_offers == 0) {
        price = offer.value.price_start;
      } else {
        if (
          offer.value.current_price !== null &&
          offer.value.current_price !== 0
        ) {
          price = offer.value.current_price + offer.value.min_raise_amount;
        } else {
          price = offer.value.price_start + offer.value.min_raise_amount;
        }
      }

      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });
    const offerStartPrice = computed(() => {
      if (offer.value.price_start) {
        return offer.value.price_start
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }
    });

    const isAuctionRunning = computed(() => {
      return !offer.value.is_finished && offer.value.is_started;
    });
    const isAuctionFinished = computed(() => {
      return offer.value.is_finished;
    });
    const isAutionHasWinner = ref(false);

    function refreshOffer() {
      store.dispatch("Offer/getOfferDetails", offerID);
    }

    onMounted(() => {
      const interval = setInterval(() => {
        refreshOffer();
      }, 1000 * 30);
      onUnmounted(() => {
        clearInterval(interval);
      });

      // refreshOffer when offer date_start changes
      const offerStartInterval = setInterval(() => {
        // check if current time is after offer date_start
        if (isAuctionRunning.value) return;
        if (isAuctionFinished.value) return;
        // if (!offer.value.is_started) {
        if (offer.value.date_start) {
          let timeStart = new Date(offer.value.date_start.replace(/ /g, "T"));
          let now = new Date();
          if (now.getTime() > timeStart.getTime()) {
            refreshOffer();
          }
          // }
        }
      }, 1000);

      onUnmounted(() => {
        clearInterval(offerStartInterval);
      });
    });

    return {
      isAuctionRunning,
      isAuctionFinished,
      isAutionHasWinner,
      offer,
      currentPrice,
      offerMinPrice,
      offerStartPrice,
      isLoading,
      slider,
      activeOfferImageIndex,
      changeSliderImage,
    };
  },
};
</script>  

<style scoped>
@import url("/src/styles/auctionDetails.css");
</style>