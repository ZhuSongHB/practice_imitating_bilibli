const vm = new Vue({
    el: "#app",
    data: {
        navList: [],
        navHide: true
    },
    methods: {
        handleDown() {
            this.navHide = !this.navHide
        },
        handleActive(nav, index) {
            this.navList.forEach(res => {
                this.$set(res, 'active', false)
            })
            nav.active = true
        }
    },
    computed: {

    },
    watch: {

    },
    created() {
        const navDataAxios = axios.create();
        navDataAxios.get('/nav', {
            baseURL: 'https://developer.duyiedu.com/vue/bz'
        }).then(res => {
            if (res.status == 200) {
                this.navList = res.data.data;
            }
            this.navList.forEach(res => {
                this.$set(res, 'active', false)
            })
            this.navList[0].active = true;
        })
    },
    mounted() {

    }
})