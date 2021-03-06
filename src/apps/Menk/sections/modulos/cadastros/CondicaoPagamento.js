import React, { Component } from 'react';
import update from 'immutability-helper';
import FlexView from 'react-flexview';
import TitledPage from '../../../components/TitledPage';
import PaperSection from '../../../components/PaperSection';
import DefaultCrudService from '../../../services/DefaultCrudService';
import CondicaoPagamentoParcela from './CondicaoPagamentoParcela';

class CondicaoPagamento extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            parcelas: []
        };
        this.service = new DefaultCrudService('/condicao-pagamento');
        this.handleChange = this.handleChange.bind(this);
        this.handleParcelaChange = this.handleParcelaChange.bind(this);
        this.adicionarParcela = this.adicionarParcela.bind(this);
        this.removeParcela = this.removeParcela.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if(id) {
            this.service.get(id).then(res => {
                this.setState(res.data);
            })
        } else {
            this.adicionarParcela();
        }
    }

    handleChange(field) {
        return (e) => {
            let change = {};
            change[field] = e.target.value;
            this.setState(change);
        };
    }

    handleParcelaChange(index, parcela) {
        console.log(index, parcela);
        const change = {};
        change[index] = {$set: parcela};
        this.setState({
            parcelas: update(this.state.parcelas, change)
        });
    }

    adicionarParcela() {
        this.setState({
            parcelas: update(this.state.parcelas, {$push: [{dias: 0, fracao: 0}]})
        });
    }

    removeParcela(index) {
        this.setState({
            parcelas: update(this.state.parcelas, {$splice: [[index, 1]]})
        });
    }

    salvar() {
        if (!this.state.descricao) {
            return;
        }
        this.service.save(this.state).then(res => this.props.history.push('/cadastros/condicoes-pagamento'));
    }

    render() {
        return (
            <TitledPage title={this.props.match.params.id ? "Editando condição de pagamento" : "Nova condição de pagamento"}>
                <PaperSection>
                    <FlexView grow>
                        <FlexView basis="500" column hAlignContent='left' className="form-input">
                            <label>Descrição</label>
                            <input type="text" value={this.state.descricao || ''} onChange={this.handleChange('descricao')}/>
                        </FlexView>
                    </FlexView>
                </PaperSection>
                <PaperSection title="Parcelas">
                    <FlexView grow>
                        <FlexView shrink column hAlignContent='left' className="form-input">
                            {this.state.parcelas.map((parcela, index) => 
                                <CondicaoPagamentoParcela key={index} index={index} value={parcela} onChange={this.handleParcelaChange} onRemove={this.removeParcela}/>
                            )}
                            <FlexView>
                                <button onClick={this.adicionarParcela} className="default">Adicionar parcela</button>
                            </FlexView>
                        </FlexView>
                    </FlexView>
                </PaperSection>
                <PaperSection>
                    <FlexView grow hAlignContent='right'>
                        <FlexView>
                            <button onClick={this.salvar} className="default primary">Salvar</button>
                        </FlexView>
                    </FlexView>
                </PaperSection>
            </TitledPage>
        );
    }
}

export default CondicaoPagamento;