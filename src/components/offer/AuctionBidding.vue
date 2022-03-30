<template>
  <div class="item-pricing-area mt-3">
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
              class="btn btn-sm btn-default bg-white shadow refresh-btn d-flex"
            >
              Aktualizuj cenę
              <img width="24px" src="/public/assets/icon/refresh.svg" alt="" />
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
            <form @submit.prevent="checkBid()" action="">
              <div class="from-group">
                <label for="" class="mb-2"
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
              <div class="from-group mt-3">
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
      :offer="offer"
    ></ErrorBidModal>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import ConfirmBidModal from "./modal/ConfirmBidModal.vue";
import ErrorBidModal from "./modal/ErrorBidModal.vue";
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
    function refreshOffer() {
      lastRefreshedTime.value = new Date();
      store.dispatch("Offer/getOfferDetails", offerID);
    }
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
      return offer.price_min + offer.min_raise_amount;
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
      } catch (e) {
        toast.error("Coś poszło nie tak. Proszę spróbować za jakiś czas");
      }
    }

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
    };
  },
};
</script>

 <style scoped>
@import url("/src/styles/auctionDetails.css");
</style>