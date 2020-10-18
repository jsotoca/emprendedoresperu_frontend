import { ActivatedRoute } from '@angular/router';

export function getId(activatedRoute: ActivatedRoute){
    return new Promise<string>((resolve)=>{
      this.activatedRoute.queryParams.subscribe(params => {
        resolve(params['id'] as string); 
      });
    });
}