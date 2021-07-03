import http from "@/http";

class TutorialDataService {
    getAll():Promise<any>{
        return http.get("/tutorials");
    }
    
    get(id:number):Promise<any>{
        return http.get(`/tutorials/${id}`);
    }

    create(data:number):Promise<any>{
        return http.post("/tutorials",data);
    }

    update(id:number,data:object):Promise<any>{
        return http.put(`/tutorials/${id}`,data);
    }

    delete(id:number):Promise<any>{
        return http.delete(`/tutorials/${id}`);
    }

    deleteAll():Promise<any>{
        return http.delete(`/tutorials`);
    }

    findByTitle(title:string):Promise<any>{
        return http.get(`/tutorials?title=${title}`);
    }
}

export default new TutorialDataService();