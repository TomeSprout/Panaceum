import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useContext, useEffect } from 'react'

import { axiosPrivateInstance } from '../api/axios'
import AuthContext from '../context/AuthProvider'
import useRefreshToken from './useRefreshToken'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      async (request: AxiosRequestConfig) => {
        if (request.headers !== undefined) {
          request.headers.Authorization = `Bearer ${auth?.accessToken}`
        }

        return request
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      async (error) => {
        const prevRequest = error.response.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return axiosPrivateInstance(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept)
      axiosPrivateInstance.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivateInstance
}

export default useAxiosPrivate
