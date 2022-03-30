<template>
  <div class="item-pricing-area mt-3" v-if="isAuctionFinished">
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
          <span class="text-red"> <strong>ukcja zakończonaA:</strong></span>
        </td>
        <td class="text-left">
          <span class="text-muted">
            {{ moment(offer.date_end).format("ddd DD, YYYY, h:mm:ss A") }}
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
</template>