const vm = new Vue({
    el: "#app",
    data: {
        navList: [],
        navHide: true,
        navActiveIndex: 0
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
        const navDataAxios = axios.create();
        navDataAxios.get('/nav', {
            baseURL: 'https://developer.duyiedu.com/vue/bz'
        }).then(res => {
            if (res.status == 200) {
                this.navList = res.data.data;
            }
        })
    },
    mounted() {

    }
})