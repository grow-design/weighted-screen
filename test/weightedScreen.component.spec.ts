import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {WeightedScreen} from './../src/weightedScreen.component';
import {WeightedScreenModule} from '../src';

describe('weighted-screen component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [WeightedScreenModule]});
  });

  it('should say hello world', () => {
    const fixture: ComponentFixture<WeightedScreen> = TestBed.createComponent(WeightedScreen);
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML.trim()).to.equal('Weighted Screen from the weighted screen module!');
  });

});
