const vm = new Vue({
    el: "#app",
    data: {
        navList: [],                //导航数据
        navHide: true,              //显示大的导航  true不显示
        navActiveIndex: 0,          //给点击的导航目标添加active类名
        bannerList: [],             //存放轮播图图片
        bannerWidth: 350,           //基础宽度
        // bannerLength: 0,             //长度
        bannerStyle: {              //css值
            left: 0,
        },
        bannerActiveIndex: 0,        //索引
    },
    methods: {
        // 显示大的导航开关
        handleDown() {
            this.navHide = !this.navHide
        },
        /**
         * 给点击的导航目标添加active类名
         * @param {*} index    点击的index
         */
        handleActive(index) {
            this.navActiveIndex = index
        },
        // 轮播
        autoMove() {
            setTimeout(() => {
                if (this.bannerActiveIndex === 0) {

                    this.bannerStyle.transition = 'left .3s'
                }
                this.bannerActiveIndex++
                this.bannerStyle.left = -this.bannerWidth * this.bannerActiveIndex + 'px'
            }, 1500);
        },
        // transitionend事件结束后触发
        handleTransitionEnd() {
            if (this.bannerActiveIndex === 3) {
                this.bannerActiveIndex = 0
                this.bannerStyle.left = 0
                this.bannerStyle.transition = 'none'
            }
            this.autoMove()
        }
    },
    computed: {
        bannerCountWidth() {
            //容器总长度
            return this.bannerWidth * this.bannerList.length + 'px'
        },
    },
    watch: {

    },
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
        axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz'
        axios.all([
            axios.get('/nav'),
            axios.get('/banner'),
        ]).then(axios.spread((navRes, banRes) => {
            if (navRes.status == 200) {
                this.navList = navRes.data.data;
            }
            if (banRes.status == 200) {
                const lastEle = { ...banRes.data.data[0] }
                lastEle.id = Math.floor(Math.random() * 10000000)
                this.bannerList = [...banRes.data.data, lastEle]
            }
        }))

    },
    mounted() {
        this.autoMove()
    }
})