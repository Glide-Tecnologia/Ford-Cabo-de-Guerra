//Pinos de conexao do modulo
#define pinS0 4
#define pinS1 5  
#define pinS2 6
#define pinS3 7
#define pinOut 3
#define pinLED 8


unsigned int valorVermelho = 0;
unsigned int valorVerde = 0;
unsigned int valorAzul = 0;
unsigned int valorBranco = 0;

void detectaCor();

void setup()
{
  pinMode(pinS0, OUTPUT);
  pinMode(pinS1, OUTPUT);
  pinMode(pinS2, OUTPUT);
  pinMode(pinS3, OUTPUT);
  pinMode(pinLED, OUTPUT);
  pinMode(pinOut, INPUT);

  Serial.begin(9600);
  digitalWrite(pinS0, HIGH);
  digitalWrite(pinS1, LOW);

  delay(1000);
  //Liga LED
  digitalWrite(pinLED, HIGH);
}

void loop()
{
  //Detecta a cor
  detectaCor();

  //Mostra valores no serial monitor
//  Serial.print("Vermelho :");
  Serial.print(valorVermelho);
  Serial.print(",");

//  Serial.print(" Verde : ");
  Serial.print(valorVerde);
  Serial.print(",");

//  Serial.print(" Azul : ");
  Serial.print(valorAzul);
  Serial.print(",");

//  Serial.print(" Branco : ");
  Serial.print(valorBranco);
  Serial.println();

  //Verifica se a cor vermelha foi detectada
//  if ((valorVermelho < valorAzul) &&
//      (valorVermelho < valorVerde) &&
//      (valorBranco < 100)) {
//    Serial.println("Vermelho");
//
//  } else if ((valorAzul < valorVermelho) &&  //Verifica se a cor azul foi detectada
//             (valorAzul < valorVerde) &&
//             (valorBranco < 100)) {
//    Serial.println("Azul");
//
//  } else if ((valorVerde < valorVermelho) &&  //Verifica se a cor verde foi detectada
//             (valorVerde < valorAzul) &&
//             (valorBranco < 100)) {
//    Serial.println("Verde");
//  }
//  Serial.println();

  delay(100);
}


// *********** Função de leitura so sensor de cor ********************
void detectaCor() {
  //Vermelho
  digitalWrite(pinS2, LOW);
  digitalWrite(pinS3, LOW);
  valorVermelho = pulseIn(pinOut, digitalRead(pinOut) == HIGH ? LOW : HIGH);
  
  //Sem filtro
  digitalWrite(pinS2, HIGH);
  valorBranco = pulseIn(pinOut, digitalRead(pinOut) == HIGH ? LOW : HIGH);

  //Azul
  digitalWrite(pinS2, LOW);
  digitalWrite(pinS3, HIGH);
  valorAzul = pulseIn(pinOut, digitalRead(pinOut) == HIGH ? LOW : HIGH);

  //Verde
  digitalWrite(pinS2, HIGH);
  valorVerde = pulseIn(pinOut, digitalRead(pinOut) == HIGH ? LOW : HIGH);
}
