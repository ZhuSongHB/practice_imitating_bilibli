const vm = new Vue({
  el: "#app",
  data: {
    navList: [], //导航数据
    navHide: true, //显示大的导航  true不显示
    navActiveIndex: 0, //给点击的导航目标添加active类名
    bannerList: [], //存放轮播图图片
    bannerWidth: 350, //基础宽度
    // bannerLength: 0,         //长度
    bannerStyle: {
      //css值
      left: 0,
    },
    bannerActiveIndex: 0, //轮播图索引
    oldVidleList: [], //没经过播放量处理的视频数据
    params: {
      start: 0,
      offset: 12,
    }, //请求数据配置
    videoOffset: 12,
    videoGettingData: false,
  },
  methods: {
    // 显示大的导航开关
    handleDown() {
      this.navHide = !this.navHide;
    },
    /**
     * 给点击的导航目标添加active类名
     * @param {*} index    点击的index
     */
    handleActive(index) {
      this.navActiveIndex = index;
    },
    // 轮播
    autoMove() {
      setTimeout(() => {
        if (this.bannerActiveIndex === 0) {
          this.bannerStyle.transition = "left .3s";
        }
        this.bannerActiveIndex++;
        this.bannerStyle.left =
          -this.bannerWidth * this.bannerActiveIndex + "px";
      }, 1500);
    },
    // transitionend事件结束后触发
    handleTransitionEnd() {
      if (this.bannerActiveIndex === 3) {
        this.bannerActiveIndex = 0;
        this.bannerStyle.left = 0;
        this.bannerStyle.transition = "none";
      }
      this.autoMove();
    },
    // 屏幕滑动
    handleScroll(e) {
      const dom = e.target;
      const { scrollHeight, offsetHeight, scrollTop } = dom;
      const toBottomHeight = scrollHeight - offsetHeight - scrollTop;

      if (toBottomHeight < 300 && !this.videoGettingData) {
        this.videoGettingData = true;
        axios
          .get("/video", {
            params: {
              start: this.oldVidleList.length,
              offset: this.videoOffset,
            },
          })
          .then((res) => {
            this.oldVidleList.push(...res.data.data);
            this.videoGettingData = false;
          });
      }
    },
  },
  computed: {
    bannerCountWidth() {
      //容器总长度
      return this.bannerWidth * this.bannerList.length + "px";
    },
    videoList() {
      // 处理播放量的数据
      return this.oldVidleList.map((item) => {
        item.play = item.play > 10000 ? item.play / 10000 + "万" : item.play;
        item.rank = item.rank > 10000 ? item.rank / 10000 + "万" : item.rank;
        return item;
      });
    },
  },
  watch: {},
  created() {
    // const navDataAxios = axios.create();
    // const bannerDataAxios = axios.create();
    // navDataAxios.get('/nav', {
    //     baseURL: 'https://developer.duyiedu.com/vue/bz'
    // }).then(res => {
    //     if (res.status == 200) {
    //         this.navList = res.data.data;
    //     }
    // })
    // bannerDataAxios.get('/banner', {
    //     baseURL: 'https://developer.duyiedu.com/vue/bz'
    // })

    // 并发处理
    axios.defaults.baseURL = "https://developer.duyiedu.com/vue/bz";
    axios
      .all([
        axios.get("/nav"),
        axios.get("/banner"),
        axios.get("/video", {
          params: this.params,
        }),
      ])
      .then(
        axios.spread((navRes, banRes, vidRes) => {
          if (navRes.status == 200) {
            this.navList = navRes.data.data;
          }
          if (banRes.status == 200) {
            const lastEle = { ...banRes.data.data[0] };
            lastEle.id = Math.floor(Math.random() * 10000000);
            this.bannerList = [...banRes.data.data, lastEle];
          }
          if (vidRes.status == 200) {
            this.oldVidleList = vidRes.data.data;
          }
        })
      );
  },
  mounted() {
    this.autoMove();
  },
});
