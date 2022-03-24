<template>
  <div class="auction-details-page">
    <div class="row">
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

              <div class="d-flex justify-content-between align-items-center">
                <div class="timer-text bg-white text-dark">
                  <span class="time">
                    {{ isAuctionRunning ? "01" : "00" }}
                  </span>
                  <span class="text">Day's</span>
                </div>
                <div class="timer-text bg-white text-dark">
                  <span class="time">
                    {{ isAuctionRunning ? "01" : "00" }}
                  </span>
                  <span class="text">Hour</span>
                </div>
                <div class="timer-text bg-white text-dark">
                  <span class="time">
                    {{ isAuctionRunning ? "01" : "00" }}</span
                  >
                  <span class="text">Minute</span>
                </div>
                <div class="timer-text bg-white text-dark">
                  <span class="time">
                    {{ isAuctionRunning ? "01" : "00" }}</span
                  >
                  <span class="text">Second</span>
                </div>
              </div>
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
            <h3 class="item-heading">Modern Home</h3>
          </div>
          <div class="item-description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              itaque adipisci iste, dolorem nisi atque deleniti facere,
              consectetur delectus libero eos necessitatibus, consequuntur ipsam
              fuga similique tempore in doloribus beatae.
            </p>
          </div>

          <div class="items-list-description">
            <table class="item-details-table table table-borderless">
              <tr>
                <td class="text-right"><strong>Agencja :</strong></td>
                <td class="text-left text-muted">Real Agency</td>
              </tr>
              <tr>
                <td class="text-right"><strong>Kategoria :</strong></td>
                <td class="text-left text-muted">For Agent</td>
              </tr>
              <tr>
                <td class="text-right"><strong>Adres :</strong></td>
                <td class="text-left text-muted">101 dhaka, Bangladesh</td>
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
                  <h5 class="text-blue m-0"><strong>1,000,000 zl</strong></h5>
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
                    <h5 class="text-blue m-0"><strong>1,000,000 zl</strong></h5>
                    <div
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
                        src="/assets/icon/refresh 1.svg"
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
                    <p class="m-0 text-muted">11:12:30</p>
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
                        <strong>200,000 zl</strong></label
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
                  <span class="text-muted">Fav 25, 2022, 12:00 AM</span>
                </td>
              </tr>

              <tr>
                <td class="text-right">
                  <span class="text-green">
                    <strong>Cena końcowa:</strong></span
                  >
                </td>
                <td class="text-left">
                  <h5 class="text-blue m-0"><strong>1,000,000 zl</strong></h5>
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
                    <strong>Aukcja zakończona:</strong></span
                  >
                </td>
                <td class="text-left">
                  <span class="text-muted">Fav 25, 2022, 12:00 AM</span>
                </td>
              </tr>
              <tr>
                <td class="text-right">
                  <span class="text-red"> <strong>Ostatnia cena:</strong></span>
                </td>
                <td class="text-left text-red">
                  <h4 class="p-0 mt-3 mb-2">
                    <strong>200,000 zl</strong>
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
import { ref } from "vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
import { FreeMode, Navigation, Thumbs } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
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

    const isAuctionRunning = ref(false);
    const isAuctionFinished = ref(true);
    const isAutionHasWinner = ref(false);

    return {
      onSwiper,
      onSlideChange,
      thumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs],
      isAuctionRunning,
      isAuctionFinished,
      isAutionHasWinner,
    };
  },
};
</script>  

<style scoped>
.auction-details-page {
  padding: 150px 0;
}
img {
  max-width: 100%;
}
.main-image {
  height: 400px;
  object-fit: cover;
}
.item-heading {
  font-weight: bold;
}
.item-description {
  margin-top: 10px;
  color: var(--grey);
  font-size: 14px;
}

td.text-right {
  width: 30%;
  /* width: 300px; */
  text-align: right;
}
td.text-left {
  width: 70%;
  text-align: left;
  padding-left: 10px;
}
.fs-18 {
  font-size: 20px;
}

img.shadow.slide-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

div.swiper-area-border {
  border: 2px solid #407ff0;
  padding: 10px 38px;
  border-radius: 10px;
  margin-top: 20px;
  position: relative;
}
.swiper-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #407ff0;
  font-size: 25px;
  transition: all 0.3s ease-in-out;
}
.prev-arrow {
  left: 20px;
}
.next-arrow {
  right: 20px;
}
.image-and-timer-area {
  position: relative;
}

.auction-timer {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  background-color: var(--blue);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.timer-text.bg-white.text-dark {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 0 5px;
  box-shadow: 0px 0px 10px rgba(131, 131, 131, 0.5);
  border-radius: 10px;
}
.timer-text .time {
  font-weight: 700;
}
.timer-text .text {
  font-size: 11px;
  font-weight: bold;
}
.refresh-btn {
  font-size: 13px;
  width: 160px;
  justify-content: center;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
.refresh-btn img {
  width: 18px;
  margin-left: 10px;
}

.aution-running-sta {
  padding: 8px 20px;
  border: 2px solid #0080007d;
  border-radius: 10px;
  margin-bottom: 20px;
  color: var(--green);
  font-weight: bold;
}
.aution-finish-sta {
  padding: 8px 20px;
  border: 2px solid #d8282575;
  border-radius: 10px;
  margin-bottom: 20px;
  color: red;
  font-weight: bold;
}
table {
  width: 100% !important;
}
</style>