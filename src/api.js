export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

export const request = async (url,options = {})=>{
    try {
        const res = await fetch(`${API_END_POINT}${url}`,{
            ...options,
            headers:{
                "Content-type": "application/json",
                'x-username': 'hyeon'
            }
        })
        console.log(`${API_END_POINT}${url}`)

        if(res.ok) {
            console.log("성공")
            return await res.json()
        }
        throw new Error('API 처리 중 뭔가 이상합니다.')
    } catch(e) {
        alert(e.message)
    }


}
    