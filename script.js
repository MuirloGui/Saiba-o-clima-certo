const input = document.querySelector('#barraPesquisa')
const btnPesquisa = document.querySelector('#btn_pesquisa')
const apresentaClima = document.querySelector('.apresenta_clima')
const body = document.querySelector('body')

const climaHeader = document.querySelector('.clima_header')
const divClimaAtual = document.querySelector('.clima_atual')
const divClimaDetalhes = document.querySelector('.clima_detalhes')

body.style.background = "var(--background-ceuLimpo)";

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
        vento: dados.current.wind_kph,
        temperatura_F: dados.current.temp_f,
        humidade: dados.current.humidity,
        condicao: traducaoClima[dados.current.condition.text] || [],
        icone: dados.current.condition.icon
        }
} 
console.log(dados);

        return clima
}

btnPesquisa.addEventListener('click', async ()=>{
    const valorPesquisa = input.value
    const clima = await buscaClima(valorPesquisa)
    apresentaClima.innerHTML = ""
    alteraFundo(clima)
    mostraClima(clima)

})

function mostraClima(dados){
    
    const cidade = dados.localizacao.cidade
    const temperatura = dados.ambiente.temperatura_C
    const sensacao = dados.ambiente.sensacao
    const umidade = dados.ambiente.humidade
    const regiao =  dados.localizacao.regiao
    const vento = dados.ambiente.vento
    const condicao = dados.ambiente.condicao
    const icone = dados.ambiente.icone

    const img = document.createElement('img')
    img.src = `https:${icone}`
    
    const h2 = document.createElement('h2')
    h2.textContent = `${cidade},  ${regiao}`

    const recebeTemperatura = document.createElement('p')
      recebeTemperatura.textContent = `${temperatura}°C`
      recebeTemperatura.classList.add('item1')

    const recebeCondicao = document.createElement('p')
      recebeCondicao.textContent = `${condicao}`
      recebeCondicao.classList.add('item2')

    const recebeSensacao = document.createElement('p')
      recebeSensacao.textContent = ` Sensação térmica: ${sensacao}°`
      recebeSensacao.classList.add('item3')

    const recebeUmidade = document.createElement('p')
      recebeUmidade.textContent = `Umidade do ar de: ${umidade}%`

    const recebeVento = document.createElement('p')
      recebeVento.textContent = `Ventos de: ${vento}km/h`

    climaHeader.innerHTML = "";
    divClimaAtual.innerHTML = "";
    divClimaDetalhes.innerHTML = "";

    apresentaClima.append(climaHeader, divClimaAtual, divClimaDetalhes)

    climaHeader.append(h2)
    divClimaAtual.append(img,recebeTemperatura,recebeCondicao,recebeSensacao)
    divClimaDetalhes.append(recebeUmidade, recebeVento)
}

function alteraFundo(clima){
  const condicao = clima?.ambiente?.condicao
    switch (condicao) {
      
      case "Ensolarado":
        body.style.background = "var(--background-ensolarado)";
        break
      
      case "Céu limpo":
        body.style.background = "var(--background-ceuLimpo)"; 
       break
      
      case "Parcialmente nublado":
        body.style.background = "var(--background-ceuLimpo)";
       break
      
      case "Nublado":
          body.style.background = "var(--background-tempofechado)";
       break
      
      case "Encoberto":
        body.style.background = "var(--background-tempofechado)";
       break
      
      case "Chuva fraca":
        body.style.background = "var(--background-chuvaOuGaroa)";
       break
      
      case "Chuva moderada":
          body.style.background = "var(--background-chuvaOuGaroa)";
       break
      
      case "Chuva forte":
        body.style.background = "var(--background-chuvaForte)";
       break
      
      case "Tempestade":
        body.style.background = "var(--background-tempestade)";
       break
      
      default:
         body.style.background = "var(--background-ceuLimpo)";
        break;
    }
}
