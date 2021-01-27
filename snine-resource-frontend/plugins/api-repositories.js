import {createApi} from '~/assets/js/createApi'


export default ({$axios}, inject) => {
    const repositoryWithAxios = createApi($axios)

    const allApi = {
        user: repositoryWithAxios('/user'),
        upload: repositoryWithAxios('/upload'),
        query: repositoryWithAxios('/query'),
    }

    inject('myApi', allApi)
}