import { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-6 text-[#2D231E]">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-[#E3D7C6] shadow-lg text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FBF0EE] text-[#9A4E38] flex items-center justify-center mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="font-serif-title text-2xl font-bold text-[#2A201A] mb-2">
              Escribanía Barzola
            </h2>
            <p className="text-sm text-[#6A5A4F] mb-6">
              Ocurrió un problema temporal al cargar los datos guardados en el navegador. Podés restablecer la página a su configuración oficial.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#3C3029] hover:bg-[#28201B] text-[#FAF6F0] font-semibold text-sm transition-all shadow-md active:scale-98"
            >
              <RotateCcw className="w-4 h-4 text-[#D8C7B0]" />
              <span>Restablecer y recargar página</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
