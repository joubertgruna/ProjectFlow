# Uso de IA

## Ferramenta utilizada

A IA foi utilizada como apoio de desenvolvimento para estruturar a arquitetura, revisar regras de negócio, sugerir organização de pastas, auxiliar na criação inicial de DTOs, serviços, testes e documentação.

## Onde a IA ajudou

- Definição da separação entre controller, service, repository e serviços de domínio.
- Organização da camada de IA com `IAClient`, `MockAiClient`, `OpenAiClient`, `AiAnalysisService` e `ProjectAnalysisPromptBuilder`.
- Criação inicial dos DTOs, validações, testes unitários e documentação.
- Revisão das regras de transição de status, exclusão e cálculo de risco.

## Prompts principais usados

- Criar uma aplicação full stack em React, NestJS, TypeScript, Prisma, PostgreSQL e Docker.
- Implementar cadastro, consulta, edição, remoção e análise inteligente de projetos.
- Separar regras de negócio do controller.
- Preparar integração real futura com OpenAI com fallback para mock.
- Documentar execução, arquitetura, variáveis de ambiente e decisões técnicas.

## O que foi aceito

- Estrutura modular do backend.
- Uso de Prisma com PostgreSQL.
- Frontend com Vite, React Router, TanStack Query, React Hook Form e Zod.
- Mock de IA coerente com nome, descrição, orçamento, prazo, status e risco.

## O que foi ajustado manualmente

- Regras exatas de transição de status.
- Regras de bloqueio de exclusão para projetos `IN_PROGRESS` e `FINISHED`.
- Formato de retorno do filtro global de exceções.
- Textos da interface e documentação em português.

## O que foi descartado

- Colocar lógica de negócio diretamente nos controllers.
- Fazer chamadas HTTP diretamente dentro das páginas.
- Acoplar o controller a um provedor específico de IA.

## Decisões técnicas humanas

A decisão de separar `RiskCalculatorService`, `ProjectStatusService`, `AiAnalysisService`, `ProjectAnalysisPromptBuilder` e `IAClient` foi tomada para manter baixo acoplamento, alta coesão e facilitar manutenção futura. Todas as regras de negócio foram revisadas manualmente.

## Limitações da entrega

- A integração OpenAI está preparada, mas usa mock por padrão.
- A autenticação não faz parte do escopo.
- O seed é opcional e contém apenas um projeto inicial.
