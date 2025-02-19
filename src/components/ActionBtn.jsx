

export function ActionBtn(){
    return (
        <>
                {/* Action buttons */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <button variant="outline" className=".searchButton">
            Create image
          </button>
          <button variant="outline" className="rounded-full">
            Analyze data
          </button>
          <button variant="outline" className="rounded-full">
            Code
          </button>
          <button variant="outline" className="rounded-full">
            Brainstorm
          </button>
          <button variant="outline" className="rounded-full">
            Summarize text
          </button>
        </div>
        </>
    )
}