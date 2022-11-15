import { useRouter } from "next/router"

export default function useBasePath(): string{
  const router = useRouter();
  return router.basePath;
}