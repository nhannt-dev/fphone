const path = {
    // Public
    PUBLIC: '/*',
    HOME: '',
    LOGIN: 'login',
    DETAIL: ':pid/:title/*',
    FILTER: 'tim-kiem',
    RESET_PASS: 'reset-mat-khau/:token',
    FORGOT_PASS: 'quen-mat-khau',
    CATALOG: 'catalogs',
    CATALOG__PR: 'catalogs/:name',

    // Smember
    PERSONAL: 'thong-tin-tai-khoan',
    WISHLIST: 'san-pham-yeu-thich',
    BUY_HISTORY: 'lich-su-mua-hang',
    SMEMBER: 'smember',
    CHANGE_PASS: 'thay-doi-mat-khau/',
    BUY: 'xac-nhan-mua-hang',
    REGISTER_RS: 'xac-nhan-dang-ky-tai-khoan/:status',

    // Private
    SYSTEM: 'he-thong',
    MANAGE_USER: 'quan-ly-thanh-vien',
    MANAGE_PRODUCT: 'quan-ly-san-pham',
    MANAGE_COUPON: 'quan-ly-coupon',
    MANAGE_BRAND: 'quan-ly-nhan-hieu',
    MANAGE_Bill: 'quan-ly-hoa-don',
    STATITICS: 'thong-ke'

}

export default path