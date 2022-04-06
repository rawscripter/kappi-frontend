<template>
  <div class="item-pricing-area mt-3">
    <table class="item-details-table table table-borderless">
      <tr>
        <td class="text-right">Aktualna cena:</td>
        <td class="text-left">
          <div class="d-flex justify-content-start align-items-center">
            <h5 class="text-blue m-0">
              <strong>{{ currentPrice }} zł</strong>
            </h5>
            <span class="hide-on-mobile">
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
                <img width="24px" src="/assets/icon/refresh.png" alt="" />
              </div>
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td class="text-right">Ostatnia aktualizacja ceny:</td>
        <td class="text-left">
          <div class="mt-3">
            <p class="m-0 text-muted">
              {{ moment(lastRefreshedTime).format("H:mm:ss") }}
            </p>
          </div>
        </td>
      </tr>

      <tr>
        <td colspan="3">
          <span class="hide-on-desktop">
            <div
              @click="refreshOffer()"
              class="btn btn-sm btn-default bg-white shadow refresh-btn m-auto"
            >
              Aktualizuj cenę
              <img width="24px" src="/assets/icon/refresh.png" alt="" />
            </div>
          </span>
        </td>
      </tr>

      <tr class="pricing-from">
        <td class="text-right hide-on-mobile"></td>
        <td class="text-left" colspan="3">
          <div class="mt-3">
            <form @submit.prevent="checkBid()" action="" class="auction-form">
              <div class="from-group">
                <label for="" class="mb-2 fs-13"
                  >Minimalna wartość oferty:
                  <strong>{{ offerMinPrice }} zł</strong></label
                >
                <input
                  type="number"
                  placeholder="Twoja oferta"
                  class="form-control custom-input-box"
                  v-model="biddingAmount"
                  required
                />
              </div>
              <div class="from-group button-group mt-2">
                <button type="submit" class="btn btn-block btn-primary sha">
                  Licytuj
                </button>
              </div>
            </form>
          </div>
        </td>
      </tr>
    </table>
    <ConfirmBidModal
      :biddingPrice="biddingAmount"
      :showModal="showConfirmBiddingModal"
      @closeModal="closeConfirmBiddingModal"
      @confrimAuctionBid="confrimAuctionBid"
      :offer="offer"
      :isBidding="isBidding"
    ></ConfirmBidModal>
    <ErrorBidModal
      :biddingPrice="biddingAmount"
      :showModal="showErrorBiddingModal"
      @closeModal="closeErrorBiddingModal"
      @refreshOffer="refreshOffer"
      :offer="offer"
    ></ErrorBidModal>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import ConfirmBidModal from "./modal/ConfirmBidModal.vue";
import ErrorBidModal from "./modal/ErrorBidModal.vue";
import { c } from "../../../dist/assets/vendor.7931a408";
export default {
  components: { ConfirmBidModal, ErrorBidModal },
  props: {
    currentPrice: {
      type: Number,
      required: false,
      default: 0,
    },
    offerMinPrice: {
      type: Number,
      required: false,
      default: 0,
    },
    offer: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  created: function () {
    this.moment = moment;
  },

  setup(props) {
    const { offer } = props;
    const store = useStore();
    const route = useRoute();
    const offerID = route.params.id;
    const lastRefreshedTime = ref(new Date());
    const toast = useToast();

    const biddingAmount = ref("");
    const showConfirmBiddingModal = ref(false);
    const showErrorBiddingModal = ref(false);

    const closeConfirmBiddingModal = () => {
      showConfirmBiddingModal.value = false;
    };
    const closeErrorBiddingModal = () => {
      showErrorBiddingModal.value = false;
    };

    const minimumBidPrice = computed(() => {
      if (offer.current_price != null && offer.current_price != 0) {
        return offer.current_price + offer.min_price_increment;
      }

      return offer.price_start + offer.min_raise_amount;
    });

    async function checkBid() {
      if (minimumBidPrice.value > biddingAmount.value) {
        toast.error(`Minimalna wartość oferty to ${minimumBidPrice.value} zł`);
        return;
      }
      const payload = {
        offer_id: offerID,
        bid_amount: biddingAmount.value,
      };
      try {
        const response = await store.dispatch("Offer/checkActionBid", payload);
        if (response.data.status === "success") {
          showConfirmBiddingModal.value = true;
        }
        if (response.data.status === "error") {
          showErrorBiddingModal.value = true;
        }
      } catch (e) {
        toast.error("Coś poszło nie tak. Proszę spróbować za jakiś czas");
      }
    }
    const isBidding = ref(false);

    async function confrimAuctionBid() {
      isBidding.value = true;
      const bidPayload = {
        offer_id: offerID,
        bid_amount: biddingAmount.value,
      };
      try {
        const bidResponse = await store.dispatch(
          "Offer/confrimAuctionBid",
          bidPayload
        );
        if (bidResponse.data.status === "success") {
          showConfirmBiddingModal.value = false;
          isBidding.value = false;
          refreshOffer();
          toast.success("Oferta została złożona");
        }

        if (bidResponse.data.status === "error") {
          toast.error(bidResponse.data.message);
        }
      } catch (e) {
        toast.error("Coś poszło nie tak. Proszę spróbować za jakiś czas");
      } finally {
        isBidding.value = false;
      }
    }

    function refreshOffer() {
      lastRefreshedTime.value = new Date();
      store.dispatch("Offer/getOfferDetails", offerID);
    }

    function refreshOffer() {
      lastRefreshedTime.value = new Date();
      store.dispatch("Offer/getOfferDetails", offerID);
    }

    onMounted(() => {
      const interval = setInterval(() => {
        refreshOffer();
      }, 1000 * 600);
      onUnmounted(() => {
        clearInterval(interval);
      });
    });

    return {
      refreshOffer,
      checkBid,
      biddingAmount,
      showConfirmBiddingModal,
      closeConfirmBiddingModal,
      confrimAuctionBid,
      isBidding,
      closeErrorBiddingModal,
      showErrorBiddingModal,
      refreshOffer,
    };
  },
};
</script>

 <style scoped>
@import url("/src/styles/auctionDetails.css");
</style>