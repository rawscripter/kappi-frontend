<template>
  <div class="auction-details-page">
    <div class="spinner" v-if="isOffersLoading">
      <easy-spinner class="large-spinner" />
    </div>
    <div v-else class="row">
      <div class="col-md-6">
        <div class="carosel-area">
          <div class="image-and-timer-area">
            <img
              src="/assets/img/Landing-page-bg.jpg"
              class="shadow main-image"
              alt=""
            />

            <div class="auction-timer bg-blue">
              <p>
                {{ isAuctionRunning ? "Aukcja trwa" : "Czas dobiegł końca" }}
              </p>

              <CountDown :endDate="new Date(offer.date_end)">
                <template v-slot="{ day, hour, min, sec }">
                  <!-- {{ day }}D, {{ hour }}H : {{ min }}M : {{ sec }}S -->

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ day }}
                        <!-- {{ isAuctionRunning ? "01" : "00" }} -->
                      </span>
                      <span class="text">Day's</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ hour }}
                        <!-- {{ isAuctionRunning ? "01" : "00" }} -->
                      </span>
                      <span class="text">Hour</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time"> {{ min }}</span>
                      <!--  {{ isAuctionRunning ? "01" : "00" }} -->
                      <span class="text">Minute</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ sec }}
                        <!-- {{ isAuctionRunning ? "01" : "00" }}-->
                      </span>
                      <span class="text">Second</span>
                    </div>
                  </div>
                </template>
              </CountDown>
            </div>
          </div>

          <div class="">
            <swiper
              class="swiper-area swiper-area-border"
              :modules="modules"
              :slides-per-view="4"
              :space-between="15"
              :navigation="true"
              :pagination="{ clickable: true }"
              :scrollbar="{ draggable: true }"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
            >
              <swiper-slide v-for="(x, index) in 4" :key="index">
                <img
                  src="/assets/img/Landing-page-bg.jpg"
                  class="shadow slide-image"
                  alt=""
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <div class="col-md-6">
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
                <td class="text-right"><strong>Agencja :</strong></td>
                <td class="text-left text-muted">{{ offer.agency_name }}</td>
              </tr>
              <tr>
                <td class="text-right"><strong>Kategoria :</strong></td>
                <td class="text-left text-muted">
                  {{ offer.offer_category_name }}
                </td>
              </tr>
              <tr>
                <td class="text-right"><strong>Adres :</strong></td>
                <td class="text-left text-muted">{{ offer.address }}</td>
              </tr>
            </table>
          </div>
          <div
            class="item-pricing-area mt-3"
            v-if="!isAuctionRunning && !isAuctionFinished"
          >
            <table class="item-details-table table table-borderless">
              <tr>
                <td class="text-right"><strong>Cena wywolawcza:</strong></td>
                <td class="text-left">
                  <h5 class="text-blue m-0">
                    <strong>{{ offerStartPrice }} zł</strong>
                  </h5>
                </td>
              </tr>
            </table>
          </div>
          <div class="item-pricing-area mt-3" v-if="isAuctionRunning">
            <table class="item-details-table table table-borderless">
              <tr>
                <td class="text-right"><strong>Aktualna cena:</strong></td>
                <td class="text-left">
                  <div class="d-flex justify-content-start align-items-center">
                    <h5 class="text-blue m-0">
                      <strong>{{ currentPrice }} zł</strong>
                    </h5>
                    <div
                      @click="refreshOffer()"
                      class="
                        btn btn-sm btn-default
                        bg-white
                        shadow
                        refresh-btn
                        d-flex
                      "
                    >
                      Aktualizuj cenę
                      <img
                        width="24px"
                        src="/public/assets/icon/refresh.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="text-right">
                  <strong>Ostatnia aktualizacja ceny:</strong>
                </td>
                <td class="text-left">
                  <div class="mt-3">
                    <p class="m-0 text-muted">
                      {{ moment(lastRefreshedTime).format("h:mm:ss A") }}
                    </p>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="text-right"></td>
                <td class="text-left">
                  <div class="mt-3">
                    <div class="from-group">
                      <label for="" class="mb-2"
                        >Minimalna wartość oferty:
                        <strong>{{ offerMinPrice }} zł</strong></label
                      >
                      <input
                        type="text"
                        placeholder="Twoja oferta"
                        class="form-control custom-input-box"
                      />
                    </div>
                    <div class="from-group mt-3">
                      <div class="btn btn-block btn-primary sha">Licytuj</div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <div class="item-pricing-area mt-3" v-if="isAuctionFinished">
            <table
              v-if="isAutionHasWinner"
              class="item-details-table table table-borderless"
            >
              <tr>
                <td class="text-right"><strong>Aukcja zakończona:</strong></td>
                <td class="text-left">
                  <span class="text-muted">
                    {{
                      moment(offer.date_end).format("ddd DD, YYYY, h:mm:ss A")
                    }}
                  </span>
                </td>
              </tr>

              <tr>
                <td class="text-right">
                  <span class="text-green">
                    <strong>Cena końcowa:</strong></span
                  >
                </td>
                <td class="text-left">
                  <h5 class="text-blue m-0">
                    <strong>{{ startPrice }} zł</strong>
                  </h5>
                </td>
              </tr>

              <!-- <tr>
                <td class="text-right">
                  <span class="text-green"> <strong>Zwycięzca :</strong></span>
                </td>
                <td class="text-left">
                  <p class="text-blue m-0">
                    <strong
                      >Gratulujemy! <br />
                      Wygrałeś aukcję.
                    </strong>
                  </p>
                </td>
              </tr> -->
              <tr>
                <td class="text-right">
                  <span class="text-green"> <strong>Zwycięzca :</strong></span>
                </td>
                <td class="text-left">
                  <p class="text-blue m-0"><strong>a....s</strong></p>
                </td>
              </tr>
            </table>

            <table v-else class="item-details-table table table-borderless">
              <tr>
                <td class="text-right">
                  <span class="text-red">
                    <strong>ukcja zakończonaA:</strong></span
                  >
                </td>
                <td class="text-left">
                  <span class="text-muted">
                    {{
                      moment(offer.date_end).format("ddd DD, YYYY, h:mm:ss A")
                    }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="text-right">
                  <span class="text-red"> <strong>Ostatnia cena:</strong></span>
                </td>
                <td class="text-left text-red">
                  <h4 class="p-0 mt-3 mb-2">
                    <strong>{{ offerMinPrice }} zł</strong>
                  </h4>

                  <p class="m-0 p-0">Cena minimalna nie</p>
                  <p class="m-0 p-0">Zastala asiagnieta</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, computed } from "vue";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import CountDown from "./item/CountDown.vue";
import moment from "moment";

export default {
  components: {
    Swiper,
    SwiperSlide,
    CountDown,
  },
  created: function () {
    this.moment = moment;
  },
  setup() {
    let thumbsSwiper = null;
    const onSwiper = (swiper) => {
      // console.log("Swiper instance", swiper);
    };
    const onSlideChange = (swiper) => {
      console.log("slide change", swiper.activeIndex);
      thumbsSwiper = swiper;
    };

    const route = useRoute();

    const offerID = route.params.id;
    const store = useStore();
    const offer = computed(() => store.getters["Offer/currentOffer"]);

    const isOffersLoading = computed(
      () => store.getters["Offer/isOffersLoading"]
    );

    onMounted(() => {
      store.dispatch("Offer/getOfferDetails", offerID);
    });

    const currentPrice = computed(() => {
      if (offer.value.current_price) {
        return offer.value.current_price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    });

    const offerMinPrice = computed(() => {
      if (offer.value.price_min) {
        return offer.value.price_min
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    });
    const offerStartPrice = computed(() => {
      if (offer.value.price_start) {
        return offer.value.price_start
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    });

    const isAuctionRunning = computed(() => {
      return !offer.value.is_finished && offer.value.is_started;
    });
    const isAuctionFinished = computed(() => {
      return offer.value.is_finished;
    });
    const isAutionHasWinner = ref(false);

    const lastRefreshedTime = ref(new Date());

    function refreshOffer() {
      lastRefreshedTime.value = new Date();
      store.dispatch("Offer/getOfferDetails", offerID);
    }

    return {
      onSwiper,
      onSlideChange,
      thumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs],
      isAuctionRunning,
      isAuctionFinished,
      isAutionHasWinner,
      offer,
      currentPrice,
      offerMinPrice,
      offerStartPrice,
      isOffersLoading,
      lastRefreshedTime,
      refreshOffer,
    };
  },
};
</script>  

 <style scoped>
@import url("/src/styles/auctionDetails.css");
</style>