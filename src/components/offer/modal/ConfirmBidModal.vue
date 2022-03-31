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
                  <strong> Potwierdź wprowadzoną kwotę</strong>
                </h5>
              </div>
            </div>

            <div class="autction-descriptions mt-3 mb-3">
              <h4 class="text-blue">
                <strong>{{ biddingPrice }} zł</strong>
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
              <p class="mb-0 text-muted mr-3 fs-13 d-flex">
                Aukcja kończy się za: &nbsp;
                <CountDown :endDate="new Date(offer.date_end)">
                  <template v-slot="{ day, hour, min, sec }">
                    <span class="text-dark"
                      >{{ day }} dni, {{ hour }}:{{ min }}:{{ sec }}</span
                    >
                  </template>
                </CountDown>
              </p>
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
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0 mr-3"><strong>Twoja oferta:</strong></p>
                <h4 class="text-blue m-0">
                  <strong>{{ biddingPrice }} zł</strong>
                </h4>
              </div>

              <div>
                <button
                  @click="confrimAuctionBid"
                  type="submit"
                  class="btn btn-primary shadow"
                >
                  <span v-if="isBidding"
                    ><easy-spinner class="small-spinner" /> Przetwarzanie</span
                  >
                  <span v-else>Potwierdź</span>
                </button>
              </div>
            </div>

            <div class="autction-descriptions mt-3 mb-3">
              <p class="fs-13 m-0">
                <strong>Potwierdzając</strong> ofertę zobowiązujesz się do
                dokonania transakcji po deklarowanej cenie.
              </p>
            </div>
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
  components: {
    CountDown,
  },
  created: function () {
    this.moment = moment;
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
    confrimAuctionBid() {
      this.$emit("confrimAuctionBid");
    },
  },
};
</script>

<style scoped>
@import url("/src/styles/biddingModal.css");
</style>> 