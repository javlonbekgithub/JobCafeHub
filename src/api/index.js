import { Alert } from "react-native"
import { setLoading } from "../store"

export const authApi = '/user/signin?_f=json&include=specializations'

export const signUpApi = '/user/signup'

export const updateApi = '/user/update?_f=json&include=specializations'

export const getMeApi = '/user/get-me?_f=json&include=specializations'

export const portfolioApi = '/user/portfolio'

export const specializationsListApi = '/specialization?_f=json&_l=en'

export const filterSpecApi = '?'

export const pageNumberApi = '&page='

export const json = '&_f=json'

export const searchApi = '/user/search?plain='

export const perPageApi = '&per-page='

export const specArrApi = '&include=specializations'

export const userCharge = 'https://api.job-cafe.uz/v1/user/charge?method='

export const usersNearby = {
    begin: '/user/nearby/',
    end: '_f=json&include=specializations&per-page='
}

export const workerById = {
    begin: '/user/',
    end: '?_f=json&include=specializations'
}

export const dailyWorkerApi = 'filter[master]=0'

export const genderFilterApi = 'filter[gender]='

export const Api = (url, data = null, type = 'GET', token = null) => {

    let opts = {
        method: type,
        redirect: 'follow',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }

    if (data) {
        opts.body = data
    } 
    if (token) {
        opts.headers = {
            "Authorization": `Bearer ${token}`
        }
    }

    return fetch(`https://api.job-cafe.uz/v1${url}`, opts)
        .then(res => res.json())
        .catch(err => {
                console.log(err)
                console.log('erro')
                setLoading(false)
            }
        )

}