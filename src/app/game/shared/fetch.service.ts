import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor() {}

  public async fetch(url:string, method: 'POST', abortSignal: AbortSignal, body?: any): Promise<any> {

    const response = await fetch(url, {
      signal: abortSignal,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('Unable to fetch');
    return response.json();
  }
}
