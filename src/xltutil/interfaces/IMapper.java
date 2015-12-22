package xltutil.interfaces;

public interface IMapper<T, DTO>
{
    public DTO toDto(T o);

    public T fromDto(DTO o);
}
