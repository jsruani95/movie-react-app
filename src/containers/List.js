import React, { Fragment } from "react";
import Card from "../components/Card/Card";

const API = process.env.API;
console.log(process.env.API);

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      searchTerm: "",
      error: "",
    };
  }

  async componentDidMount() {
    // const res = await fetch("../../assets/data.json");
    const res = await fetch(`${API}&s=batman`);
    const resJSON = await res.json();
    console.log(resJSON);
    if (resJSON) {
      this.setState({
        data: resJSON.Search,
        loading: false,
        error: "",
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.state.searchTerm) {
      return this.setState({ error: "Por favor, ingrese un texto valido." });
    }

    const response = await fetch(`${API}&s=${this.state.searchTerm}`);
    const data = await response.json();
    console.log(data);
    if (!data.Search) {
      return this.setState({ error: "No se han encontrado resultados." });
    }

    return this.setState({
      data: data.Search,
      searchTerm: "",
      error: "",
    });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <div>Cargando...</div>;
    }

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-4">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa cualquier pelicula / serie"
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                value={this.state.searchTerm}
                autoFocus
              />
            </form>
            <p className="text-white mt-3">
              {this.state.error ? this.state.error : ""}
            </p>
          </div>
        </div>
        <div className="row pt-2">
          {data.map((movie, i) => (
            <Card movie={movie} key={i} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default List;