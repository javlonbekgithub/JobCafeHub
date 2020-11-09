import { observable, action } from 'mobx'
import { wordsRu } from './../languages/ru'
import { wordsUz } from './../languages/uz'
import { saveLang } from '../helper-functions'

export const defaultUser = {
    code: 0,
    message: '',
    data: {
        id: 0,
        phone: '',
        token: '',
        type: 3,
        first_name: '',
        middle_name: '',
        last_name: '',
        image: {},
        passport_file: {},
        created_at: 0,
        updated_at: 0,
        birth_date:  '',
        master: null,
        gender: null,
        status: 9,
        lat: 0,
        lon: 0,
        distance: null,
        balance: 0,
        age: 32,
        comment: null,
        portfolio: [],
        specializations: []
    }
}

// const tmpUser = {
//     code: '',
//     message: '',
//     data: {
//         id: 1011018,
//         phone: "",
//         token: "",
//         type: 3,
//         first_name: "",
//         middle_name: "",
//         last_name: "",
//         image: {
//         full: "",
//         thumb: "",
//         small: "",
//         medium: ""
//         },
//         passport_file: {
//         full: "",
//         thumb: "",
//         small: "",
//         medium: ""
//         },
//         created_at: 0,
//         updated_at: 0,
//         birth_date: "",
//         master: null,
//         gender: null,
//         status: 0,
//         lat: 0,
//         lon: 0,
//         distance: null,
//         balance: 0,
//         age: 0,
//         portfolio: [],
//         comment: null
//     }
// }
export let lang = observable({
    ...wordsRu, active: 'ru'
})
export const proWorkersList = [
    {
        id: 1,
        title: 'Сантехник',
    },
    {
        id: 2,
        title: 'Бўеқчи'
    },
    {
        id: 3,
        title: 'Префоратор'
    },
    {
        id: 4,
        title: 'Сувоқчи'
    },
    {
        id: 5,
        title: 'Сантехник'
    },
    {
        id: 6,
        title: 'Пайвандчи'
    },
    {
        id: 7,
        title: 'Брусчаткачи'
    },
    {
        id: 8,
        title: 'Кафелчи'
    },
    {
        id: 9,
        title: 'Дурадгор'
    },
    {
        id: 10,
        title: 'Ғишт терувчи'
    },
    {
        id: 11,
        title: 'Том ёпувчи'
    },
    {
        id: 12,
        title: 'Электрик'
    },
    {
        id: 13,
        title: 'Декор'
    }
]
export let location = {
    latitude: 41.311081,
    longitude: 69.240562,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0021,
}
export let user = observable({
    code: 0,
    message: '',
    data: {
        id: 0,
        phone: '',
        token: '',
        type: 3,
        first_name: '',
        middle_name: '',
        last_name: '',
        image: {},
        passport_file: {},
        created_at: 0,
        updated_at: 0,
        birth_date:  '',
        master: null,
        gender: null,
        status: 9,
        lat: 0,
        lon: 0,
        distance: null,
        balance: 0,
        age: 32,
        comment: null,
        portfolio: [],
        specializations: []
    }
})
export let selectedWorkerGlobal = observable({
    id: 0,
    phone: '',
    token: '',
    type: 0,
    first_name: '',
    middle_name: '',
    last_name: '',
    image: '',
    passport_file: '',
    created_at: '',
    updated_at: '',
    birth_date: '' ,
    master: 0,
    gender: 0,
    status: '',
    lat: 0,
    lon: 0,
    distance: 0,
    balance: 0,
    age: 0,
    comment: '',
    portfolio: [],
    specializations: []
})
export let specList = observable([])
export let selectedSpecIdsForNewUser = observable([])
export let regData = observable({
    phone: '',
    password: '',
    password_confirm: '',
    birth_date: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    lat: location.latitude,
    lon: location.longitude,
    passport: '',
    gender: 1,
    master: 0,
    type: "",
    image: '',
    passport_file: '',
    specializations: []
})
export let photosUri = observable({
    user: '',
    passport: ''
})
export let loading = observable({
    value: false
})

export const setUser = action((incomedData, portfolio = false) => {
    console.log(JSON.stringify(incomedData,null,2))
    if (!portfolio) {
        user.code = incomedData.code
        user.message = incomedData.message
        user.data = incomedData.data
        user.data.portfolio = incomedData.data.portfolio
        if (user.data.specializations && user.data.specializations.length > 0) {
            user.data.master = 1
        } else {
            user.data.master = 0
        }
        if (user.data.specializations && user.data.specializations.length > 0) {
            let specIds = []
            user.data.specializations.map((item) => specIds = [...specIds, item.id])
            setRegData({
                specializations: [ ...specIds]
            })
        }
    } else {
        user.data.portfolio = [...user.data.portfolio, incomedData]
    }
    // console.log(JSON.stringify(user,null,2))
})

// export const addPortfolio = action(portfolio => {
//     console.log('newPortfloio',portfolio)
//     user.data.portfolio = [...user.data.portfolio, portfolio]
//     console.log(JSON.stringify(user.data.portfolio,null,2))
// })

export const setSelectedWorkerGlobal = action(data => {
    console.log(JSON.stringify(data,null,2))
    selectedWorkerGlobal.first_name = data.first_name
    selectedWorkerGlobal.id = data.id
    selectedWorkerGlobal.gender = data.gender
    selectedWorkerGlobal.last_name = data.last_name
    selectedWorkerGlobal.middle_name = data.middle_name
    selectedWorkerGlobal.image = data.image
    selectedWorkerGlobal.distance = data.distance
    selectedWorkerGlobal.specializations = data.specializations
    selectedWorkerGlobal.age = data.age
    selectedWorkerGlobal.balance = data.balance
    selectedWorkerGlobal.birth_date = data.birth_date
    selectedWorkerGlobal.comment = data.comment
    selectedWorkerGlobal.created_at = data.created_at
    selectedWorkerGlobal.lat = data.lat
    selectedWorkerGlobal.lon = data.lon
    selectedWorkerGlobal.master = data.master
    selectedWorkerGlobal.phone = data.phone
    selectedWorkerGlobal.status = data.status
    selectedWorkerGlobal.passport_file = data.passport_file
    selectedWorkerGlobal.token = data.token
    selectedWorkerGlobal.portfolio = data.portfolio
})
export let genderFilter = observable({
    value: undefined
})
export let activeButton = observable({
    dailyWorker: false,
    proWorker: false
})
export let registration = observable({
    value: ''
})
export const setSpecList = action(data => {
    specList = data
})
export let paymentUrl = observable({
    value: ''
})
export let error = observable({
    value: ''
})

export const setSelectedSpecIdsForNewUser = action(data => {
    selectedSpecIdsForNewUser = data
})

export const setRegData = action(data => {
    regData = {...regData, ...data}
})
export const setLang = action(type => {
    saveLang(type)
    if (type === 'ru') {
        lang.active = type
        lang.workerTabs = wordsRu.workerTabs
        lang.buttonTitles = wordsRu.buttonTitles
        lang.workerTexts = wordsRu.workerTexts
        lang.drawerMenu = wordsRu.drawerMenu
        lang.inputPlaceHolder = wordsRu.inputPlaceHolder
        lang.auth = wordsRu.auth
        lang.registration = wordsRu.registration
        lang.formWarnings = wordsRu.formWarnings
        lang.blank = wordsRu.blank
        lang.profile = wordsRu.profile
        lang.loading = wordsRu.loading
        lang.distance = wordsRu.distance
        lang.information = wordsRu.information
        // lang = wordsRu
    } else if (type === 'uz') {
        lang.active = type
        lang.workerTabs = wordsUz.workerTabs
        lang.buttonTitles = wordsUz.buttonTitles
        lang.workerTexts = wordsUz.workerTexts
        lang.drawerMenu = wordsUz.drawerMenu
        lang.inputPlaceHolder = wordsUz.inputPlaceHolder
        lang.auth = wordsUz.auth
        lang.registration = wordsUz.registration
        lang.formWarnings = wordsUz.formWarnings
        lang.blank = wordsUz.blank
        lang.profile = wordsUz.profile
        lang.loading = wordsUz.loading
        lang.distance = wordsUz.distance
        lang.information = wordsUz.information

        // lang = wordsUz
    }
})

export const setLocation = (latitude, longitude) => {
    // location.latitude = latitude,
    // location.longitude = longitude,
    // location.longitudeDelta = location.longitudeDelta
    // location.latitudeDelta = location.latitudeDelta
    location = {...location, latitude, longitude}
}

export const setGenderFilter = action(data => {
    if (data === genderFilter.value) {
        genderFilter.value = undefined
    } else {
        genderFilter.value = data
    }
})

export const setPhotosUri = action((data, param) => {
    console.log(data,param)
    if (param === 0) {
        photosUri.user = data
    }
    if (param === 1) {
        photosUri.passport = data
    }
})

export const setActiveButton = action(data => {
    activeButton.dailyWorker = data.dailyWorker
    activeButton.proWorker = data.proWorker
})

export const setRegistration = action(param => registration.value = param)

export const setLoading = action(param => loading.value = param)

export const setPaymentUrl = action(newUrl => paymentUrl.value = newUrl)

export const setError = action(newError => error.value = newError)
