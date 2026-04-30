/**
 * Script para validar se a API de negociação está funcionando corretamente
 * Execute com: node tests/scripts/validate-api.js
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.API_URL || 'http://localhost:3333';
const ENDPOINT = '/api/negotiations';

// Casos de teste básicos
const testCases = [
  {
    name: 'Negociação Simples - Sucesso',
    expectedStatus: 201,
    data: {
      debtAmount: 1000.00,
      discountAmount: 100.00,
      discountRate: 10.0,
      totalAmount: 900.00,
      finalAmount: 900.00,
      effectiveDate: "2024-01-15",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      isInstallmentment: false,
      isParcelaIgual: false,
      processes: [{ id: 1 }]
    }
  },
  {
    name: 'Data Inválida - Erro',
    expectedStatus: 400,
    data: {
      debtAmount: 1000.00,
      discountAmount: 100.00,
      discountRate: 10.0,
      totalAmount: 900.00,
      finalAmount: 900.00,
      effectiveDate: "2024-01-15",
      startDate: "2024-12-31",
      endDate: "2024-01-15",
      isInstallmentment: false,
      isParcelaIgual: false,
      processes: [{ id: 1 }]
    }
  },
  {
    name: 'Sem Processos - Erro',
    expectedStatus: 400,
    data: {
      debtAmount: 1000.00,
      discountAmount: 100.00,
      discountRate: 10.0,
      totalAmount: 900.00,
      finalAmount: 900.00,
      effectiveDate: "2024-01-15",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      isInstallmentment: false,
      isParcelaIgual: false,
      processes: []
    }
  }
];

function makeRequest(testCase) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + ENDPOINT);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const postData = JSON.stringify(testCase.data);

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Accept': 'application/json'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: response,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Iniciando validação da API de Negociação...\n');
  console.log(`📍 URL Base: ${BASE_URL}${ENDPOINT}\n`);

  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    try {
      console.log(`🧪 Executando: ${testCase.name}`);

      const result = await makeRequest(testCase);

      if (result.status === testCase.expectedStatus) {
        console.log(`✅ PASSOU - Status: ${result.status}`);

        if (result.status === 201) {
          console.log(`   📄 Negociação criada com ID: ${result.data.data?.id || 'N/A'}`);
        } else if (result.status === 400) {
          console.log(`   ⚠️  Erro esperado: ${result.data.error || result.data.message || 'N/A'}`);
        }

        passed++;
      } else {
        console.log(`❌ FALHOU - Esperado: ${testCase.expectedStatus}, Recebido: ${result.status}`);
        console.log(`   📄 Resposta: ${JSON.stringify(result.data, null, 2)}`);
        failed++;
      }

    } catch (error) {
      console.log(`❌ ERRO - ${error.message}`);
      failed++;
    }

    console.log(''); // Linha em branco
  }

  // Resumo
  console.log('📊 RESUMO DOS TESTES');
  console.log('='.repeat(50));
  console.log(`✅ Passou: ${passed}`);
  console.log(`❌ Falhou: ${failed}`);
  console.log(`📈 Taxa de Sucesso: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failed === 0) {
    console.log('\n🎉 Todos os testes passaram! A API está funcionando corretamente.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Alguns testes falharam. Verifique a configuração da API.');
    process.exit(1);
  }
}

// Verificar se o servidor está rodando
async function checkServer() {
  try {
    const url = new URL(BASE_URL);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: '/',
      method: 'GET',
      timeout: 5000
    };

    return new Promise((resolve, reject) => {
      const req = client.request(options, (res) => {
        resolve(true);
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.on('timeout', () => {
        reject(new Error('Timeout'));
      });

      req.end();
    });

  } catch (error) {
    return false;
  }
}

// Executar
(async () => {
  try {
    console.log('🔍 Verificando se o servidor está rodando...');
    await checkServer();
    console.log('✅ Servidor está respondendo\n');

    await runTests();
  } catch (error) {
    console.log(`❌ Erro ao conectar com o servidor: ${error.message}`);
    console.log('💡 Certifique-se de que a API está rodando em:', BASE_URL);
    process.exit(1);
  }
})();
