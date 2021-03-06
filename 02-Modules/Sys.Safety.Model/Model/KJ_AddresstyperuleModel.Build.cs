﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sys.Safety.Model
{
    [Table("KJ_Addresstyperule")]
    public partial class KJ_AddresstyperuleModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string ID
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Addresstypeid
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Devid
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double UpAlarmLowValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double UpAlarmHighValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double UpPoweroffLowValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double UpPoweroffHighValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double LowAlarmLowValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double LowAlarmHighValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double LowPoweroffLowValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public double LowPoweroffHighValue
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Bz1
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Bz2
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Bz3
        {
            get;
            set;
        }
    }
}

