namespace DBL.Backend;

public class ServiceResponse<T>
{
    public Exception Error;
    public string Message;
    public T Response;
    public bool Success;
}