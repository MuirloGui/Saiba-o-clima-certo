const input = document.querySelector('#barraPesquisa')
const btnPesquisa = document.querySelector('#btn_pesquisa')
const apresentaClima = document.querySelector('.apresenta_clima')

    async function buscaClima(cidade) {
        const url = `http://api.weatherapi.com/v1/current.json?key=b77f7fb00adc40629e9141628261807&q=${cidade}&aqi=no`
        const resposta = await fetch(url)
        const dados= await resposta.json()

        const traducaoClima = {
    "Sunny": "Ensolarado",
    "Clear": "Céu limpo",
    "Partly cloudy": "Parcialmente nublado",
    "Cloudy": "Nublado",
    "Overcast": "Encoberto",
    "Mist": "Névoa",
    "Patchy rain possible": "Possibilidade de chuva",
    "Light rain": "Chuva fraca",
    "Moderate rain": "Chuva moderada",
    "Heavy rain": "Chuva forte",
    "Thunderstorm": "Tempestade",
    "Snow": "Neve"
}

           const clima = {
        localizacao :{
        cidade: dados.location.name,
        regiao: dados.location.region,
        país: dados.location.country
        },ambiente :{
        temperatura_C: dados.current.temp_c,
        sensacao: dados.current.feelslike_c,
        temperatura_F: dados.current.temp_f,
        humidade: dados.current.humidity,
        condicao: traducaoClima[dados.current.condition.text]    
        }
}

        return clima
}

btnPesquisa.addEventListener('click', async ()=>{
    const valorPesquisa = input.value
    const paragrafo = document.createElement('p')
    const clima = await buscaClima(valorPesquisa)

    console.log(clima);
    

})

function mostraClima(dados){
    const cidade = dados.localizacao.cidade
    const temperatura = dados.ambiente.temperatura_C
    
    const umidade = dados.ambiente.humidade
    const regiao =  dados.localizacao.regiao
    const condicao = dados.ambiente.condicao

    const h2 = document.createElement('h2')
    h2.textContent = `O clima em ${cidade}, está ${condicao}`
}