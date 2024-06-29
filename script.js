var senha = prompt("Informe sua senha:");

if (/^\d+$/.test(senha)) {
  alert("Senha válida.");
  console.log("A senha inserida é: " + senha);
} else {
  alert("Senha inválida. Por favor, insira apenas números.");
}