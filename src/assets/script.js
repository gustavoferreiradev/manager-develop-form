const employeesTypes = {
    gerente: 'gerente',
    desenvolvedor: 'desenvolvedor',
}

let camposValidos = [
    {
        name: 'nome',
        isValid: false
    },
    {
        name: 'idade',
        isValid: false
    },
    {
        name: 'cargo',
        isValid: false
    },
    {
        name: 'departamento',
        isValid: false
    }
];

class Funcionario {
    constructor(nome, idade, cargo) {
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
    }

    get nome() {
        return this._nome;
    }

    set nome (nome) {
        this._nome = nome;
    }

    get cargo() {
        return this._cargo;
    }

    set cargo(cargo) {
        this._cargo = cargo;
    }

    get idade() {
        return this._idade;
    }

    set idade(idade) {
        this._idade = idade;
    }


    seApresentar() {
        return `Olá eu sou ${this._nome}, a minha idade é ${this._idade} e vim ocupar o cargo de ${this._cargo}!`;
    }

    trabalhar() {
        return `${this._nome} já bateu o ponto e começou a trabalhar!`;
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo,linguagem) {
        super(nome, idade, cargo);
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._linguagem = linguagem;        
    }

    get linguagem() {
        return this._linguagem;
    }

    set linguagem(linguagem) {
        this._linguagem = linguagem;
    }

    programar() {
        return `${this.nome} vai programar na linguagem ${this.linguagem}!\n`;
    }
}

class Gerente extends Funcionario {

    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._departamento = departamento;
    }

    get departamento() {
        return this._departamento;
    }

    set departamento(departamento) {
        this._departamento = departamento;
    }

    gerenciar() {
        return `${this._nome} agora está gerenciando o departamento ${this.departamento}\n`;
    }
}

function validarDados(fields) {
        if (fields.value) {
            exibirSucesso();
        } else {
            throw new showError(fields, 'Campo Obrigatório, por favor digite um valor!');
        }
    }

function showError (field, message) { 
   field.classList.add('borderInputError');
   field.insertAdjacentHTML('afterend', '<p class="labelError">Campo Obrigatório!</p>');
    return {
        fieldName: field.name,
        message
    }
}

function showLanguageField() {    
    const inputGroupLanguage = document.querySelector('form div.formGroup div#inputGroupLanguage');
    inputGroupLanguage.classList.replace('hiddenElement', 'inputGroup');  
}

function hiddenLanguageField() {
    const inputGroupLanguage = document.querySelector('form div.formGroup div#inputGroupLanguage');
    inputGroupLanguage.classList.replace('inputGroup', 'hiddenElement');  
}

function tipoFuncionadoSelecionado(tiposFuncionariosRadio) {
    for (funcionarioSelecionado in tiposFuncionariosRadio) {
        if (tiposFuncionariosRadio[funcionarioSelecionado].checked)
            return tiposFuncionariosRadio[funcionarioSelecionado].value;
    }
}

function clearErrorInInputFields(id) {
      const campo = document.getElementById(`${id}`);
      const inputGroup = campo.parentNode;
      const pLabelError = inputGroup.getElementsByTagName('p');
      if(pLabelError && pLabelError.length) {
        campo.classList.remove('borderInputError');
        inputGroup.removeChild(pLabelError[0]);
      }
          
}

document.addEventListener("DOMContentLoaded", (event) => {
   const form = document.getElementById('form');
   form.addEventListener('submit', (event) => {
    event.preventDefault();
    const tiposFuncionariosRadio = document.getElementsByName('tipoFuncionarioRadio');
    const nome = document.getElementById('nome');
    const idade = document.getElementById('idade');
    const cargo = document.getElementById('cargo');
    const departamento = document.getElementById('departamento');
    const linguagem = document.getElementById('linguagem');

    try {
        if(nome.value) {
          camposValidos[0].isValid = true;
        } else {
            throw new showError(nome, 'Campo Obrigatório, por favor digite um valor!');
        }

    } catch (error) {
        console.error(error);

    }
    try {
        if(idade.value) {
            camposValidos[1].isValid = true;
        } else {
            throw new showError(idade, 'Campo Obrigatório, por favor digite um valor!');
        }

    } catch (error) {
        console.error(error);
    }

    try {
        if(cargo.value) {
            camposValidos[2].isValid = true;
        } else {
            throw new showError(cargo, 'Campo Obrigatório, por favor digite um valor!');
        }
    } catch (error) {
        console.error(error);
    } 
    try {
        if(departamento.value) {
            camposValidos[3].isValid = true;
        } else {
            throw new showError(departamento, 'Campo Obrigatório, por favor digite um valor!');
        }
    } catch (error) {
        console.error(error);
    } 
    if(tipoFuncionadoSelecionado (tiposFuncionariosRadio) === employeesTypes.desenvolvedor) {
        try {
            if(linguagem.value) {
                camposValidos.push({
                    name: linguagem.name,
                    isValid: true
                })
            } else {
                throw new showError(linguagem, 'Para desenvolvedores a linguagem é obrigatória!');
            }
        } catch (error) {
            console.error(error);
        }
    }    
  
    if (camposValidos.every(campo => campo.isValid === true)) {
        const informacoesPreenchidas = document.getElementById('informacoesPreenchidas');
        informacoesPreenchidas.classList.replace('hiddenElement', 'informacoesPreenchidas');

        if(tipoFuncionadoSelecionado (tiposFuncionariosRadio) === employeesTypes.gerente) {
            const gerente = new Gerente(
                nome.value,
                idade.value,
                cargo.value,
                departamento.value
            );
            informacoesPreenchidas.insertAdjacentHTML('beforeend', `<p id="seApresentar">${gerente.seApresentar()}</p>`);
            const pSeApresentar = document.getElementById('seApresentar');
            pSeApresentar.insertAdjacentHTML('beforeend', `<p id="trabalhar">${gerente.trabalhar()}</p>`);
            const pTrabalhar = document.getElementById('trabalhar');
            pTrabalhar.insertAdjacentHTML('beforeend', `<p id="gerenciar">${gerente.gerenciar()}</p>`);


            nome.value = '';
            idade.value = '';
            cargo.value = '';
            departamento.value = '';


        } else {
            const desenvolvedor = new Desenvolvedor(
                nome.value,
                idade.value,
                cargo.value,
                departamento.value,
                linguagem.value
            );
            informacoesPreenchidas.insertAdjacentHTML('beforeend', `<p id="seApresentar">${desenvolvedor.seApresentar()}</p>`);
            const pSeApresentar = document.getElementById('seApresentar');
            pSeApresentar.insertAdjacentHTML('beforeend', `<p id="trabalhar">${desenvolvedor.trabalhar()}</p>`);
            const pTrabalhar = document.getElementById('trabalhar');
            pTrabalhar.insertAdjacentHTML('beforeend', `<p id="programar">${desenvolvedor.programar()}</p>`);

            nome.value = '';
            idade.value = '';
            cargo.value = '';
            departamento.value = '';
            linguagem.value = '';

        }
    }    
   
   });
});


