<template>
  <div class="item-pricing-area mt-3">
    <table
      v-if="isAutionHasWinner"
      class="item-details-table table table-borderless"
    >
      <tr>
        <td class="text-right"><strong>Aukcja zakończona:</strong></td>
        <td class="text-left">
          <span class="text-muted">
            {{ moment(offer.date_end).format("ddd DD, YYYY, h:mm:ss A") }}
          </span>
        </td>
      </tr>

      <tr>
        <td class="text-right">
          <span class="text-green"> <strong>Cena końcowa:</strong></span>
        </td>
        <td class="text-left">
          <h5 class="text-blue m-0">
            <strong> {{ offerCurrentPrice }} zł</strong>
          </h5>
        </td>
      </tr>

      <tr v-if="isUserWinner">
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
      </tr>
      <tr v-else>
        <td class="text-right">
          <span class="text-green"> <strong>Zwycięzca :</strong></span>
        </td>
        <td class="text-left">
          <p class="text-blue m-0">
            <strong>{{ offer.winner_email }}</strong>
          </p>
        </td>
      </tr>
    </table>

    <table v-else class="item-details-table table table-borderless">
      <tr>
        <td class="text-right">
          <span class="text-red"> <strong>Aukcja zakończona:</strong></span>
        </td>
        <td class="text-left">
          <span class="text-muted"
            >{{ moment(offer.date_end).format("MMM DD, YYYY, h:mm:ss A") }}
          </span>
        </td>
      </tr>
      <tr>
        <td class="text-right">
          <span class="text-red"> <strong>Ostatnia cena:</strong></span>
        </td>
        <td class="text-left text-red">
          <h4 class="mt-3 mb-2">
            <strong>{{ offerMinimumPrice }} zł</strong>
          </h4>

          <p class="m-0"><strong>Cena minimalna nie</strong></p>
          <p class="m-0"><strong>Zastala asiagnieta</strong></p>
        </td>
      </tr>
    </table>
    <br />
    <div class="form-group d-flex m-auto justify-content-center">
      <router-link to="/home" class="btn btn-primary">
        Inne oferty, które mogą Cię zainteresować:
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  created: function () {
    this.moment = moment;
  },
  props: {
    isAuctionFinished: {
      type: Boolean,
      required: false,
    },
    offer: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { offer } = props;
    const store = useStore();
    const user = computed(() => store.getters["User/user"]);
    const offerMinimumPrice = computed(() => {
      return offer.price_min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    const offerCurrentPrice = computed(() => {
      return offer.current_price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    });

    const isAutionHasWinner = computed(() => {
      return offer.winner_id !== null;
    });
    const isUserWinner = computed(() => {
      return offer.winner_id === user.value.id;
    });

    return {
      offerMinimumPrice,
      isAutionHasWinner,
      isUserWinner,
      offerCurrentPrice,
    };
  },
};
</script>


<style scoped>
@import url("/src/styles/auctionDetails.css");
</style>