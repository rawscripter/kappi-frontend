<template>
  <div class="bidModal">
    <div
      class="modal"
      :class="showModal ? 'show' : ''"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content shadow-sm">
          <div @click="closeModal()" class="modal-close-button shadow">
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
          <div class="modal-body">
            <div class="autction-descriptions">
              <div class="login-modal-title">
                <h5 class="text-muted text-bolder">
                  <strong> Cena uległa zmianie </strong>
                </h5>
              </div>
            </div>

            <div class="autction-descriptions mt-3 mb-3">
              <h4 class="text-red">
                <strong>{{ bidPrice }} zł</strong>
              </h4>
            </div>
            <div
              class="
                autction-descriptions
                mt-3
                mb-3
                d-flex
                justify-content-start
                align-items-center
              "
            >
              <div class="mb-0 text-muted mr-3 fs-13 d-flex">
                Aukcja kończy się za: &nbsp;
                <CountDown :offer="offer">
                  <template v-slot="{ day, hour, min, sec }">
                    <span class="text-dark"
                      >{{ day }} dni, {{ hour }}:{{ min }}:{{ sec }}</span
                    >
                  </template>
                </CountDown>
              </div>
              <p class="mb-0 mr-3 fs-13"><strong>|</strong></p>
              <p class="mb-0 ml-3 fs-13">{{ offer.total_offers }} Ofert</p>
            </div>
            <div
              class="
                autction-descriptions
                bg-grey
                mt-3
                mb-3
                d-flex
                justify-content-between
                align-items-center
                pb-3
                pt-3
              "
            >
              <div class="">
                <p class="mb-0 text-red fs-13">
                  <strong
                    >Wprowadzona kwota jest za niska. Minimalna wartość oferty:
                    {{ minBidPrice }} zł
                  </strong>
                </p>
                <p class="mb-0 fs-13 mt-2">
                  <strong>Zaproponuj wyższą cenę. </strong>
                </p>
              </div>

              <div>
                <button
                  @click="refreshOffer()"
                  type="submit"
                  style="min-width: 150px"
                  class="btn btn-primary shadow"
                >
                  Aktualizuj cenę
                </button>
              </div>
            </div>

            <!-- <div class="autction-descriptions mt-3 mb-3">
              <p class="fs-13 m-0">
                Potwierdzając ofertę zobowiązujesz się do dokonania transakcji
                po deklarowanej cenie.
              </p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CountDown from "../../../views/home/item/CountDown.vue";
export default {
  created: function () {
    this.moment = moment;
  },
  components: {
    CountDown,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    biddingPrice: {
      type: String,
      default: "",
    },
    minimumBiddingPrice: {
      type: String,
      default: "",
    },
    offer: {
      type: Object,
      required: true,
    },
    isBidding: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    refreshOffer() {
      this.$emit("refreshOffer");
      this.closeModal();
    },
    confrimAuctionBid() {
      this.$emit("confrimAuctionBid");
    },
  },
  computed: {
    bidPrice() {
      return this.biddingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    minBidPrice() {
      return this.minimumBiddingPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
  },
};
</script>

<style scoped>
@import url("/src/styles/biddingModal.css");
</style>> 