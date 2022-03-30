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
                {{
                  isAuctionRunning
                    ? "Aukcja kończy się za:"
                    : isAuctionFinished
                    ? "Aukcja zakończona:"
                    : "Aukcja kończy się za:"
                }}
              </p>

              <CountDown :endDate="new Date(offer.date_end)">
                <template v-slot="{ day, hour, min, sec }">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ day }}
                      </span>
                      <span class="text">Day's</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ hour }}
                      </span>
                      <span class="text">Hour</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time"> {{ min }}</span>
                      <span class="text">Minute</span>
                    </div>
                    <div class="timer-text bg-white text-dark">
                      <span class="time">
                        {{ sec }}
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
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, computed } from "vue";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CountDown from "./item/CountDown.vue";
import moment from "moment";
import AuctionBidding from "../../components/offer/AuctionBidding.vue";
import AuctionFinish from "../../components/offer/AuctionFinish.vue";
import { useToast } from "vue-toastification";
export default {
  components: {
    Swiper,
    SwiperSlide,
    CountDown,
    AuctionBidding,
    AuctionFinish,
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
    const router = useRouter();
    const offerID = route.params.id;
    const store = useStore();
    const offer = computed(() => store.getters["Offer/currentOffer"]);
    const toast = useToast();

    const isOffersLoading = computed(
      () => store.getters["Offer/isOffersLoading"]
    );

    onMounted(() => {
      store.dispatch("Offer/getOfferDetails", offerID).then((res) => {
        const { status, message } = res.data;
        if (status === "error") {
          toast.error(message);
          router.push("/home");
        }
      });
    });

    const currentPrice = computed(() => {
      if (offer.value.current_price) {
        return offer.value.current_price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    });

    const offerMinPrice = computed(() => {
      if (offer.value.current_price) {
        let minPrice = offer.value.current_price + offer.value.min_raise_amount;
        return minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    };
  },
};
</script>  

 <style scoped>
@import url("/src/styles/auctionDetails.css");
</style>