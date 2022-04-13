<template>
  <div class="item-pricing-area mt-3">
    <table
      v-if="isAutionHasWinner"
      class="item-details-table table table-borderless"
    >
      <tr>
        <td class="text-right text-red">Aukcję zakończono:</td>
        <td class="text-left">
          <span class="text-muted d-flex">{{ AuctionFinishDate }}</span>
        </td>
      </tr>

      <tr>
        <td class="text-right">
          <span class="text-green p-0"> Cena końcowa:</span>
        </td>
        <td class="text-left">
          <h5 class="text-blue m-0">
            <strong> {{ offerCurrentPrice }} zł</strong>
          </h5>
        </td>
      </tr>

      <tr v-if="isUserWinner">
        <td class="text-right">
          <span class="text-green p-0"> Zwycięzca:</span>
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
      <tr v-if="!isUserWinner && offer.show_anonymous_mail == 1">
        <td class="text-right">
          <span class="text-green p-0"> Zwycięzca:</span>
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
          <span class="text-red p-0"> Aukcję zakończono:</span>
        </td>
        <td class="text-left">
          <span class="text-muted d-flex">{{ AuctionFinishDate }} </span>
        </td>
      </tr>
      <tr>
        <td class="text-right">
          <span class="text-red p-0"> Ostatnia cena:</span>
        </td>
        <td class="text-left text-red">
          <h4 class="mt-3 mb-1">
            <strong>{{ offerMinimumPrice }} zł</strong>
          </h4>

          <p class="m-0 fs-13 pb-0 pt-0">
            <strong>Cena minimalna nie </strong>
          </p>
          <p class="m-0 fs-13 pb-0 pt-0"><strong>została osiągnięta</strong></p>
        </td>
      </tr>
    </table>
    <br />
    <div class="form-group d-flex m-auto justify-content-center">
      <router-link
        :to="{ name: 'special-offers', params: { offer: offer.id } }"
        class="btn btn-primary btn-block p-2 shadow"
      >
        Inne oferty, które mogą Cię zainteresować
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
      return offer.price_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });

    const offerCurrentPrice = computed(() => {
      return offer.current_price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });

    const isAutionHasWinner = computed(() => {
      return offer.winner_id !== null;
    });
    const isUserWinner = computed(() => {
      return offer.winner_id === user.value.id;
    });

    const AuctionFinishDate = computed(() => {
      let dateTime = moment(offer.date_end).format("MMM DD, YYYY, H:mm:ss");

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
        EnglishMonthNames[moment(offer.date_end).month()],
        polishMonthNames[moment(offer.date_end).month()]
      );
      return dateTime;
    });

    return {
      offerMinimumPrice,
      isAutionHasWinner,
      isUserWinner,
      offerCurrentPrice,
      AuctionFinishDate,
    };
  },
};
</script>


<style scoped>
@import url("/src/styles/auctionDetails.css");
</style>