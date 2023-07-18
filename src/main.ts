import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
	const PORT = process.env.PORT || 9090;
	const app = await NestFactory.create(AppModule)

	await app.listen(PORT, () => console.log(`SERVER STARTED ON localhost:${PORT}`))
}

start()