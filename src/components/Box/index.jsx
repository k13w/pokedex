import React from 'react';
import axios from 'axios';

class BoxSize extends React.Component {
    state = {
        current: [],
        imgs: [],
        types: [],
        type1: null,
        type2: null,
        count: 1
    }

    componentDidMount() {
        this.request_api()
    }

    request_api = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.count}`);
        this.setState({
            current: res.data,
            imgs: res.data.sprites.front_default,
            type1: res.data.types[0].type.name,
            type2: res.data.types[1].type.name
        })
    }

    next_pokemon = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.count + 1}`);
        this.setState({
            current: res.data,
            imgs: res.data.sprites.front_default,
            types: res.data.types,
            count: this.state.count + 1
        })
        if (this.state.types.length > 1) {
            this.setState({
                type1: res.data.types[0].type.name,
                type2: res.data.types[1].type.name
            })
        } else {
            this.setState({ type1: res.data.types[0].type.name })
        }
    }

    previous_pokemon = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.count - 1}`);
        this.setState({
            current: res.data,
            imgs: res.data.sprites.front_default,
            types: res.data.types,
            count: this.state.count - 1
        })
        if (this.state.types.length > 1) {
            this.setState({
                type1: res.data.types[0].type.name,
                type2: res.data.types[1].type.name
            })
        } else {
            this.setState({ type1: res.data.types[0].type.name })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header bg-dark text-light">Pokedex</div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card-body d-flex align-items-center flex-row">
                                <div className="poke-image d-flex justify-content-start">
                                    <img src={this.state.imgs} width={250} alt="logo" />
                                </div>
                                <h1>{this.state.current.name}</h1>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card m-4">
                                <div className="card-header bg-info text-light">Informações</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Nome: {this.state.current.name}</li>
                                    <li className="list-group-item">Peso: {this.state.current.weight / 10} kg</li>

                                    {this.state.types.length > 1 && (
                                        <li className="list-group-item">Tipo: {this.state.type1}, {this.state.type2}</li>
                                    )}

                                    {this.state.types.length <= 1 && (
                                        <li className="list-group-item">Tipo: {this.state.type1}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-info" onClick={this.next_pokemon}>Próximo</button>
                    <button type="button" className="btn btn-danger" onClick={this.previous_pokemon}>anterior</button>
                </div>
            </div>

        )
    }
}

export default BoxSize;