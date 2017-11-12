/*
    @name: AuthGradeLanding.js
    @desc: 회원등급 이메일 인증 랜딩 페이지
    @author: Evan Moon
    @created_at: 2017.09.11
*/
import { mapGetters } from 'vuex';
import { AuthCodeMixin } from 'src/mixins/auth-code.mixin';

export default {
    name: 'AuthGradeLanding',
    mixins: [ AuthCodeMixin ],
    props: {
        code: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            isLoaded: false,
            validity: false,
            errCode: null,
            errMsg: null,
        };
    },
    computed: {
        ...mapGetters({
            isAuthorized: 'isAuthorized',
        }),
    },
    created () {
        this.fetchResult('certs.signup.code', this.$route.params.code)
        .then(res => {
            this.$set(this, 'isLoaded', true);
            this.$set(this, 'validity', res.validity);
        }, err => {
            this.$set(this, 'isLoaded', true);
            if (err) {
                this.$set(this, 'errCode', err.status);
                this.$set(this, 'errMsg', err.statusText);
            }
        });
    },
};
