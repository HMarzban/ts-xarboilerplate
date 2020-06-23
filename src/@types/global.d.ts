declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGODB_URL?: string
			JWT_TOKEN?: string
			PHONE_CODE_SALT?: string
			SALTROUNDS?: string | number
			IS_PROD?: string
		}
	}
}

declare module "http" {
	export interface IncomingHttpHeaders {
		"x-access-token"?: string
	}
}

interface Error {
	code?: string
	Message?: string
	detail?: any
	innerException?: any
}

declare namespace Express {
	interface admin {
		admin?: any
		user?: any
	}
	export interface Request {
		local: admin
		queryString: string
	}
}
