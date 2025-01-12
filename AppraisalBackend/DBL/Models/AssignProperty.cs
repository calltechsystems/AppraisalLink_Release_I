using System;
using System.Collections.Generic;

namespace DBL.Models;

public partial class AssignProperty
{
    public int Id { get; set; }

    public int Companyid { get; set; }

    public int Appraiserid { get; set; }

    public int Propertyid { get; set; }
    public Property Property { get; set; }
    public DateTime? CreatedDateTime { get; set; }
    
}
