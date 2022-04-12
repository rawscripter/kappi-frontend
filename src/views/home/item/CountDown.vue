<template>
  <div>
    <slot :day="day" :hour="hour" :min="min" :sec="sec"></slot>
  </div>
</template>

<script>
export default {
  props: {
    offer: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    negative: {
      // optional, should countdown after 0 to negative
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      now: new Date(),
      timer: null,
    };
  },
  computed: {
    day() {
      if (!this.offer.date_end) return 0;
      let endDate = new Date(this.offer.date_end.replace(/ /g, "T"));
      if (this.now.getTime() > endDate) return 0;
      let d = Math.trunc((endDate - this.now) / (1000 * 60 * 60 * 24));
      return d > 9 ? d : "0" + d;
    },
    hour() {
      if (!this.offer.date_end) return 0;
      let endDate = new Date(this.offer.date_end.replace(/ /g, "T"));
      if (this.now.getTime() > endDate) return 0;
      let h = Math.trunc((endDate - this.now) / 1000 / 3600) % 24;
      return h > 9 ? h : "0" + h;
    },
    min() {
      if (!this.offer.date_end) return 0;
      let endDate = new Date(this.offer.date_end.replace(/ /g, "T"));
      if (this.now.getTime() > endDate) return 0;
      let m = Math.trunc((endDate - this.now) / 1000 / 60) % 60;
      return m > 9 ? m : "0" + m;
    },
    sec() {
      if (!this.offer.date_end) return 0;
      let endDate = new Date(this.offer.date_end.replace(/ /g, "T"));
      if (this.now.getTime() > endDate) return 0;
      let s = Math.trunc((endDate - this.now) / 1000) % 60;
      return s > 9 ? s : "0" + s;
    },
  },
  watch: {
    endDate: {
      immediate: true,
      handler(newVal) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
          this.now = new Date();
          if (this.negative) return;
          if (this.now > newVal) {
            this.now = newVal;
            this.$emit("endTime");
            clearInterval(this.timer);
          }
        }, 1000);
      },
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>