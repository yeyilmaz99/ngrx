import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { CounterState } from '../state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {
  constructor(private store: Store< {counter : CounterState}>) { }
  counter$: Observable<number>;

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter)
  }



}
