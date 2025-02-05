import { toast } from "@/hooks/useToast";

export function ellipsify(str = '', len = 4) {
    if (str.length > 30) {
      return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
    }
    return str
  }

  export function copyToClipboard(content: string) {
    navigator.clipboard.writeText(content)
    .then(() => {
        toast.success("Copied")
    })
    .catch(() => {
        toast.error("Failed to copy address")
    });
  }