const app = document.querySelector("#app");

const products = axios.get(
  "https://acme-users-api-rev.herokuapp.com/api/products"
);
const companies = axios.get(
  "https://acme-users-api-rev.herokuapp.com/api/companies"
);

const e = React.createElement;
const { Component } = React;

class Products extends Component {
  render() {
    const { products } = this.props;
    const prods = products.map((prod) => {
      return e("li", { className: "product" }, prod.name);
    });
    return e("ul", { className: "productList" }, prods);
  }
}

class Companies extends Component {
  render() {
    const { companies } = this.props;
    const comps = companies.map((comp) => {
      return e("li", { className: "company" }, comp.name);
    });
    return e("ul", { className: "companyList" }, comps);
  }
}

class App extends Component {
  state = {
    products: [],
    companies: [],
  };

  componentDidMount() {
    Promise.all([products, companies]).then((res) => {
      this.setState({
        products: res[0].data,
        companies: res[1].data,
      });
    });
  }

  render() {
    const { products, companies } = this.state;
    const header = e(
      "h1",
      { className: "header" },
      `Acme- We have ${products.length} Products and ${companies.length} Companies`
    );
    const prods = e(Products, { products: products }, null);
    const comps = e(Companies, { companies: companies }, null);
    const main = e("div", { className: "main" }, prods, comps);
    return e("div", null, header, main);
  }
}

ReactDOM.render(e(App), app);
