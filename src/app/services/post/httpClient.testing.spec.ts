import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

let testUrl = '/data';
interface Data {
  name: string;
}
describe('Http Client Testing module', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should call the testUrl with get request', (done: DoneFn) => {
    const testData: Data = { name: 'Jay Patel' };
    httpClient.get<Data>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
      done();
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData); // mock response data on subscribe
    expect(request.request.method).toBe('GET');
  });

  it('should test multiple requests', () => {
    const testData: Data[] = [{ name: 'jay patel' }, { name: 'meet patel' }];
    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data.length).toBe(0);
    });
    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data).toEqual([testData[0]]);
    });
    httpClient.get<Data[]>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const requests = httpTestingController.match(testUrl);
    expect(requests.length).toBe(3);

    requests[0].flush([]);
    requests[1].flush([testData[0]]);
    requests[2].flush(testData);
  });
});
