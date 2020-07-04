const vm = new Vue({
    el: "#app",
    data: {
        navList: [],
        navHide: true,
        navActiveIndex: 0,
        banner: []
    },
    methods: {
        handleDown() {
            this.navHide = !this.navHide
        },
        handleActive(index) {
            this.navActiveIndex = index
        }
    },
    computed: {

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
        axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz'
        axios.all([
            axios.get('/nav'),
            axios.get('/banner'),
        ]).then(axios.spread((navRes, banRes) => {
            if (navRes.status == 200) {
                this.navList = navRes.data.data;
            }
        }))

    },
    mounted() {

    }
})