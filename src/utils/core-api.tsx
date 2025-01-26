import Request from './request';

type NumberOrString = number | string;
export type ParamsType = {
  id?: string;
  image_type?: 'all' | 'photo' | 'illustration' | 'vector';
  orientation?: 'all' | 'horizontal' | 'vertical';
  category?:
    | 'backgrounds'
    | 'fashion'
    | 'nature'
    | 'science'
    | 'education'
    | 'feelings'
    | 'health'
    | 'people'
    | 'religion'
    | 'places'
    | 'animals'
    | 'industry'
    | 'computer'
    | 'food'
    | 'sports'
    | 'transportation'
    | 'travel'
    | 'buildings'
    | 'business'
    | 'music';
  min_width?: string;
  min_height?: string;
  colors?:
    | 'grayscale'
    | 'transparent'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'turquoise'
    | 'blue'
    | 'lilac'
    | 'pink'
    | 'white'
    | 'gray'
    | 'black'
    | 'brown';
  editors_choice?: boolean;
  safesearch?: boolean;
  order?: 'popular' | 'latest';
  page?: number;
  per_page?: number;
};

class CoreApi {
  private http = Request;
  private _base_path = `?key=${process.env.EXPO_PUBLIC_API_KEY}`;
  constructor() {}
  private stringifySearchQuery(values: any) {
    return Object.keys(values)
      .map((k) => {
        return `&${k}=${values[k]}`;
      })
      .join('')
      .slice(0, -1);
  }
  getImages(params: ParamsType, page = 1, perPage = 60) {
    const queryParams = this.stringifySearchQuery(params);
    const queryString = `${queryParams}&per_page=${perPage}&page=${page}`;
    return this.http.get(this._base_path + queryString);
  }
  search(searchString: string, page = 1, perPage = 60) {
    const queryString = `&q=${encodeURIComponent(
      searchString
    )}&image_type=photo&per_page=${perPage}&page=${page}`;
    return this.http.get(this._base_path + queryString);
  }
  findOne(id: NumberOrString) {
    return this.http.get(`${this._base_path}/${id}`);
  }
  changeKey() {
    if (this._base_path === `?key=${process.env.EXPO_PUBLIC_API_KEY}`) {
      this._base_path = `?key=${process.env.EXPO_PUBLIC_API_KEY2}`;
    } else if (this._base_path === `?key=${process.env.EXPO_PUBLIC_API_KEY2}`) {
      this._base_path = `?key=${process.env.EXPO_PUBLIC_API_KEY3}`;
    } else {
      this._base_path = `?key=${process.env.EXPO_PUBLIC_API_KEY}`;
    }
  }
}

const api = new CoreApi();

export { api };
