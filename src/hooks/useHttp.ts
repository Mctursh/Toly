
import { useChatContext } from "@/components/Context/ChatProvider";
import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import type { FetchOptions } from "ofetch";
import { useAuth } from "./useAuth";
export const useApi = () => {
    // const config = useRuntimeConfig();
    // const baseUrl = config.public.baseURL
    const { state } = useChatContext()
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const accessToken = state.accessToken
    const fetch = Axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        // onResponse({ response, request }) {
        //     if (!response.ok) {
        //         switch (response.status) {
        //             case 401:
        //                 if (response._data.error == 'access_token_expired') {
        //                     throw new Error('expired_token', { cause: request })
        //                 }
        //                 if (typeof useToast == 'function') {
        //                     useToast(response._data.message || response._data.error, { type: 'error' })
        //                 }
        //                 throw createError({
        //                     statusCode: 401,
        //                     statusMessage: response._data.message || response._data.error
        //                 })
        //             case 400:
        //                 if (typeof useToast == 'function') {
        //                     useToast(Object.values(response._data.error[0])[0] as string, { type: 'error' })
        //                 }
        //                 throw createError({
        //                     statusCode: 400,
        //                     statusMessage: response._data.error[0].email
        //                 })
        //             case 403:
        //                 if (typeof useToast == 'function') {
        //                     useToast(response._data.message, { type: 'error' })
        //                 }
        //                 throw createError({
        //                     statusCode: 403,
        //                     statusMessage: response._data.error[0].email
        //                 })
        //             case 500:
        //                 if (typeof useToast == 'function') {
        //                     useToast(response._data.message, { type: 'error' })
        //                 }
        //                 throw createError({
        //                     statusCode: 500,
        //                     statusMessage: response._data.message
        //                 })
        //             default:
        //                 if (typeof useToast == 'function') {
        //                     useToast('Operation Failed', { type: 'error' })
        //                 }
        //                 throw createError({
        //                     status: response._data.success,
        //                     statusCode: response.status,
        //                     statusMessage: response._data.message,
        //                 })
        //         }
        //     }
        // },
    })
    

    // const raw = async<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", options?: FetchOptions) => {
    //     try {
    //         const data = await fetch<T>(`${baseUrl}${url}`, {
    //             ...options,
    //             method,
    //         })

    //         return data
    //     } catch (err) {
    //         return Promise.reject(err)
    //     }
    // }

    const get = async<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse | undefined> => {
        try {
            return await fetch<T>(`${url}`, {
                ...options,
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })

        } catch (error: any) {
            if (error.message == 'expired_token') {
                const authService = useAuth()
                // await authService.verifyToken()

                // const request = error.cause as RequestInfo
                // return await fetch<T>(request, {
                //     headers: {
                //         'Authorization': useDashboardStore().getToken,
                //     },
                // })
            } else {
                return Promise.resolve(error)
            }
        }
    }

    const post = async<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse | undefined> => {
        try {
            return await fetch<T>(`${url}`, {
                ...options,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })

        } catch (error: any) {
            if (error.message == 'expired_token') {
                const authService = useAuth()
                // await authService.verifyToken()

                // const request = error.cause as string
                // return await fetch<T>(request, {
                //     headers: {
                //         'Authorization': useDashboardStore().getToken,
                //     },
                // })
            } else {
                return Promise.resolve(error)
            }
        }
    }

    const del = async<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse | undefined> => {
        try {
            return await fetch<T>(`${url}`, {
                ...options,
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            })

        } catch (error: any) {
            if (error.message == 'expired_token') {
                // const authService = useAuth()
                // await authService.verifyToken()

                // const request = error.cause as RequestInfo
                // return await fetch<T>(request, {
                //     headers: {
                //         'Authorization': useDashboardStore().getToken,
                //     },
                // })
            } else {
                return Promise.resolve(error)
            }
        }
    }

    const patch = async<T>(url: string, options?: AxiosRequestConfig) => {
        try {
            return await fetch<T>(`${baseUrl}${url}`, {
                ...options,
                method: "PATCH",
            })

        } catch (error: any) {
            if (error.message == 'expired_token') {
                // const authService = useAuth()
                // await authService.verifyToken()

                // const request = error.cause as RequestInfo
                // return await fetch<T>(request, {
                //     headers: {
                //         'Authorization': useDashboardStore().getToken,
                //     },
                // })
            } else {
                return Promise.resolve(error)
            }
        }
    }

    const put = async<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            return await fetch<T>(`${baseUrl}${url}`, {
                ...options,
                method: "PUT",
            })

        } catch (error: any) {
            if (error.message == 'expired_token') {
                const { validateSession } = useAuth()
                await validateSession()

                const request = error.cause as string
                return await fetch<T>(request, {
                    headers: {
                        'Authorization': `Bearer ${useChatContext().state.accessToken}`,
                    },
                })
            } else {
                return Promise.resolve(error)
            }
        }
    }

    return { get, post, del, patch, put }
}