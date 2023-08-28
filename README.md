# Consulta Nota Premiada MS

## Descrição

Este projeto é um microserviço que tem como objetivo realizar a consulta do sorteio da nota premiada MS.
Foi desenvolvido para fins de estudo e motivo de preguiça :).
Utiliza Puppeteer para realizar a consulta do sorteio e o RabbitMQ para realizar o envio do resultado da consulta para a fila,
onde o mesmo será consumido por outro microserviço, que será responsável por enviar o resultado da consulta para um canal do Telegram.

## Tecnologias

-   NodeJS
-   Typescript
-   RabbitMQ
-   Puppeteer
